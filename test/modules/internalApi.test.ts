import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { ChiftRequestError, InternalAPI } from '../../src/modules/internalApi';

type FetchMock = jest.MockedFunction<typeof fetch>;

const BASE_URL = 'https://api.test.local';

const auth = {
    clientId: 'cid',
    clientSecret: 'csec',
    accountId: 'acc',
    baseUrl: BASE_URL,
};

const tokenBody = (overrides: Partial<{ access_token: string; expires_on: number }> = {}) => {
    const nowSec = Math.floor(Date.now() / 1000);
    return {
        access_token: overrides.access_token ?? 'tok-123',
        token_type: 'Bearer',
        expires_in: 3600,
        expires_on: overrides.expires_on ?? nowSec + 3600,
    };
};

const jsonResponse = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json' },
    });

const emptyResponse = (status: number) =>
    new Response(null, { status, headers: { 'content-type': 'application/json' } });

let fetchMock: FetchMock;

beforeEach(() => {
    fetchMock = jest.fn() as FetchMock;
    global.fetch = fetchMock as unknown as typeof fetch;
});

describe('InternalAPI fetch usage', () => {
    test('fetches a token before the first request and attaches Authorization header', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(200, { ok: true }));

        const api = new InternalAPI(auth);
        const res = await api.get('/consumers');

        expect(res.data).toEqual({ ok: true });
        expect(fetchMock).toHaveBeenCalledTimes(2);

        const [tokenUrl, tokenInit] = fetchMock.mock.calls[0];
        expect(tokenUrl).toBe(`${BASE_URL}/token`);
        expect((tokenInit as RequestInit).method).toBe('POST');
        expect(JSON.parse((tokenInit as RequestInit).body as string)).toEqual({
            clientId: 'cid',
            clientSecret: 'csec',
            accountId: 'acc',
        });

        const [reqUrl, reqInit] = fetchMock.mock.calls[1];
        expect(reqUrl).toBe(`${BASE_URL}/consumers`);
        expect((reqInit as RequestInit).method).toBe('GET');
        const headers = (reqInit as RequestInit).headers as Record<string, string>;
        expect(headers['Authorization']).toBe('Bearer tok-123');
        expect(headers['Content-Type']).toBe('application/json');
    });

    test('serializes query params, skipping null/undefined and expanding arrays', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(200, []));

        const api = new InternalAPI(auth);
        await api.get('/items', {
            params: {
                search: 'foo',
                page: 2,
                empty: null,
                missing: undefined,
                tags: ['a', 'b'],
            },
        });

        const [reqUrl] = fetchMock.mock.calls[1];
        const url = new URL(reqUrl as string);
        expect(url.pathname).toBe('/items');
        expect(url.searchParams.get('search')).toBe('foo');
        expect(url.searchParams.get('page')).toBe('2');
        expect(url.searchParams.has('empty')).toBe(false);
        expect(url.searchParams.has('missing')).toBe(false);
        expect(url.searchParams.getAll('tags')).toEqual(['a', 'b']);
    });

    test('post serializes body as JSON', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(200, { id: 'new' }));

        const api = new InternalAPI(auth);
        const res = await api.post('/things', { name: 'x' });

        expect(res.data).toEqual({ id: 'new' });
        const [, init] = fetchMock.mock.calls[1];
        expect((init as RequestInit).method).toBe('POST');
        expect((init as RequestInit).body).toBe(JSON.stringify({ name: 'x' }));
    });

    test('attaches X-Chift-* headers from interceptor-equivalent state', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(200, { ok: true }));

        const api = new InternalAPI(auth);
        api.connectionId = 'conn-1';
        api.integrationId = 'int-1';
        api.setRelatedChainExecutionId('chain-1');

        await api.get('/anything');

        const [, init] = fetchMock.mock.calls[1];
        const headers = (init as RequestInit).headers as Record<string, string>;
        expect(headers['X-Chift-ConnectionId']).toBe('conn-1');
        expect(headers['X-Chift-IntegrationId']).toBe('int-1');
        expect(headers['X-Chift-RelatedChainExecutionId']).toBe('chain-1');
    });

    test('204 No Content returns undefined data without parsing the body', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(emptyResponse(204));

        const api = new InternalAPI(auth);
        const res = await api.delete('/consumers/abc');

        expect(res.status).toBe(204);
        expect(res.data).toBeUndefined();
    });

    test('non-2xx response throws ChiftRequestError with response.status and data', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(404, { detail: 'not found' }));

        const api = new InternalAPI(auth);
        expect.assertions(4);
        try {
            await api.get('/consumers/missing');
        } catch (e) {
            expect(e).toBeInstanceOf(ChiftRequestError);
            const err = e as ChiftRequestError;
            expect(err.message).toBe('Request failed with status code 404');
            expect(err.response.status).toBe(404);
            expect(err.response.data).toEqual({ detail: 'not found' });
        }
    });
});

describe('InternalAPI token refresh', () => {
    test('reuses a non-expired token across calls (single /token fetch)', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()))
            .mockResolvedValueOnce(jsonResponse(200, { a: 1 }))
            .mockResolvedValueOnce(jsonResponse(200, { b: 2 }));

        const api = new InternalAPI(auth);
        await api.get('/one');
        await api.get('/two');

        const tokenCalls = fetchMock.mock.calls.filter(
            (c) => (c[0] as string) === `${BASE_URL}/token`
        );
        expect(tokenCalls).toHaveLength(1);
    });

    test('refreshes the token when expires_on is within the 30s buffer', async () => {
        const nowSec = Math.floor(Date.now() / 1000);
        const api = new InternalAPI(auth);
        // Pre-seed a near-expired token (10 seconds left) — well inside the 30s buffer.
        api.token = {
            access_token: 'old-token',
            token_type: 'Bearer',
            expires_in: 3600,
            expires_on: nowSec + 10,
        };

        fetchMock
            .mockResolvedValueOnce(jsonResponse(200, tokenBody({ access_token: 'fresh-token' })))
            .mockResolvedValueOnce(jsonResponse(200, { ok: true }));

        await api.get('/anything');

        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE_URL}/token`);
        const [, reqInit] = fetchMock.mock.calls[1];
        const headers = (reqInit as RequestInit).headers as Record<string, string>;
        expect(headers['Authorization']).toBe('Bearer fresh-token');
        expect(api.token.access_token).toBe('fresh-token');
    });

    test('does NOT refresh when expires_on is comfortably in the future', async () => {
        const nowSec = Math.floor(Date.now() / 1000);
        const api = new InternalAPI(auth);
        api.token = {
            access_token: 'still-good',
            token_type: 'Bearer',
            expires_in: 3600,
            expires_on: nowSec + 3600,
        };

        fetchMock.mockResolvedValueOnce(jsonResponse(200, { ok: true }));

        await api.get('/anything');

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock.mock.calls[0][0]).toBe(`${BASE_URL}/anything`);
        expect(api.token.access_token).toBe('still-good');
    });

    test('401 on /token throws "credentials are not correct" without retrying', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse(401, { detail: 'unauthorized' }));

        const api = new InternalAPI(auth);
        await expect(api.getToken()).rejects.toThrow('The provided credentials are not correct');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    test('retries up to 3 times on transient /token failures, then succeeds', async () => {
        fetchMock
            .mockResolvedValueOnce(jsonResponse(500, { detail: 'boom' }))
            .mockResolvedValueOnce(jsonResponse(502, { detail: 'bad gateway' }))
            .mockResolvedValueOnce(jsonResponse(200, tokenBody()));

        const api = new InternalAPI(auth);
        const sleepSpy = jest
            .spyOn(global, 'setTimeout')
            // Skip the actual delay so the test runs quickly.
            .mockImplementation(((fn: () => void) => {
                fn();
                return 0 as unknown as NodeJS.Timeout;
            }) as unknown as typeof setTimeout);

        try {
            await api.getToken();
        } finally {
            sleepSpy.mockRestore();
        }

        expect(fetchMock).toHaveBeenCalledTimes(3);
        expect(api.token?.access_token).toBe('tok-123');
    });

    test('forwards optional marketplaceId / envId to the token endpoint', async () => {
        fetchMock.mockResolvedValueOnce(jsonResponse(200, tokenBody()));

        const api = new InternalAPI({
            ...auth,
            marketplaceId: 'mp-1',
            envId: 'env-1',
        });
        await api.getToken();

        const [, init] = fetchMock.mock.calls[0];
        expect(JSON.parse((init as RequestInit).body as string)).toEqual({
            clientId: 'cid',
            clientSecret: 'csec',
            accountId: 'acc',
            marketplaceId: 'mp-1',
            envId: 'env-1',
        });
    });
});
