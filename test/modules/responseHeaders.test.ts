import { beforeEach, describe, expect, jest, test } from '@jest/globals';
import { InternalAPI } from '../../src/modules/internalApi';
import { createApiFor } from '../../src/helpers/openapi';
import { ChiftPromise } from '../../src/helpers/chiftPromise';
import { RequestData } from '../../src/types/api';

type FetchMock = jest.MockedFunction<typeof fetch>;

const auth = {
    clientId: 'cid',
    clientSecret: 'csec',
    accountId: 'acc',
    baseUrl: 'https://api.test.local',
};

const tokenResponse = () =>
    jsonResponse(200, {
        access_token: 'tok',
        token_type: 'Bearer',
        expires_in: 3600,
        expires_on: Math.floor(Date.now() / 1000) + 3600,
    });

const jsonResponse = (status: number, body: unknown, headers: Record<string, string> = {}) =>
    new Response(JSON.stringify(body), {
        status,
        headers: { 'content-type': 'application/json', ...headers },
    });

const page = (
    ids: number[],
    total: number,
    source: string,
    syncedAt?: string,
    coveredFrom?: string
) =>
    jsonResponse(
        200,
        { items: ids.map((id) => ({ id })), total, page: 1, size: ids.length },
        {
            'X-Chift-Datalayer-Source': source,
            ...(syncedAt ? { 'X-Chift-Datalayer-Synced-At': syncedAt } : {}),
            ...(coveredFrom ? { 'X-Chift-Datalayer-Covered-From': coveredFrom } : {}),
        }
    );

const factory = {
    getOrders(): RequestData<{ id: number }[]> {
        return { method: 'get', url: '/consumers/{consumer_id}/pos/orders', datalayer: true };
    },
};

let fetchMock: FetchMock;

beforeEach(() => {
    fetchMock = jest.fn() as FetchMock;
    global.fetch = fetchMock as unknown as typeof fetch;
});

const pos = () => createApiFor(factory, new InternalAPI(auth), 'Consumer', 'c-1');

describe('withResponse', () => {
    test('awaiting the call still resolves to the data', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(page([1], 1, 'datalayer'));

        const call = pos().getOrders();

        expect(call).toBeInstanceOf(ChiftPromise);
        expect(call).toBeInstanceOf(Promise);
        expect(await call).toEqual([{ id: 1 }]);
    });

    test('exposes any header of each response, with the request that produced it', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(
                jsonResponse(200, { items: [{ id: 1 }], total: 1 }, { 'X-Custom': 'abc' })
            );

        const { data, headers } = await pos().getOrders().withResponse();

        expect(data).toEqual([{ id: 1 }]);
        expect(headers.responses).toHaveLength(1);
        expect(headers.last?.get('x-custom')).toBe('abc');
        expect(headers.last?.method).toBe('GET');
        expect(headers.last?.path).toBe('/consumers/c-1/pos/orders');
        expect(headers.last?.status).toBe(200);
        expect(headers.last?.datalayer).toBeUndefined();
    });

    test('parses the datalayer freshness headers', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(
                page([1], 1, 'datalayer', '2026-09-29T10:00:00+00:00', '2025-01-01')
            );

        const { headers } = await pos().getOrders().withResponse();

        expect(headers.last?.datalayer).toEqual({
            source: 'datalayer',
            syncedAt: new Date('2026-09-29T10:00:00Z'),
            coveredFrom: '2025-01-01',
        });
    });

    test('combines pages into the worst case and reports mixed sources', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(
                page([1], 3, 'datalayer', '2026-09-29T10:00:00+00:00', '2025-01-01')
            )
            .mockResolvedValueOnce(
                page([2], 3, 'datalayer', '2026-09-29T08:00:00+00:00', '2025-03-01')
            )
            .mockResolvedValueOnce(page([3], 3, 'classic'));

        const { data, headers } = await pos().getOrders().withResponse();

        expect(data).toHaveLength(3);
        expect(headers.responses).toHaveLength(3);
        expect(headers.datalayer).toEqual({
            source: 'mixed',
            syncedAt: new Date('2026-09-29T08:00:00Z'),
            coveredFrom: '2025-03-01',
        });
    });

    test('an unparseable synced-at stays readable as a raw header', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(page([1], 1, 'datalayer', 'yesterday'));

        const { headers } = await pos().getOrders().withResponse();

        expect(headers.last?.datalayer?.syncedAt).toBeUndefined();
        expect(headers.last?.get('x-chift-datalayer-synced-at')).toBe('yesterday');
    });

    test('a failed request carries the headers of the failing response', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(
                jsonResponse(429, { message: 'Too many requests' }, { 'Retry-After': '30' })
            );

        expect.assertions(3);
        try {
            await pos().getOrders();
        } catch (e: any) {
            expect(e.error.status_code).toBe(429);
            expect(e.headers.last.status).toBe(429);
            expect(e.headers.last.get('retry-after')).toBe('30');
        }
    });

    test('catch and finally behave like a regular promise', async () => {
        fetchMock
            .mockResolvedValueOnce(tokenResponse())
            .mockResolvedValueOnce(jsonResponse(404, { message: 'Not found' }));
        const onFinally = jest.fn();

        const caught = await pos()
            .getOrders()
            .catch((e: any) => e.error.status_code)
            .finally(onFinally);

        expect(caught).toBe(404);
        expect(onFinally).toHaveBeenCalledTimes(1);
    });
});
