import { AuthType, TokenType, RequestData } from '../types/api';
import Settings from '../helpers/settings';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface RequestConfig {
    url: string;
    method?: string;
    params?: Record<string, any> | null;
    data?: unknown;
    body?: unknown;
    headers?: Record<string, string>;
}

export interface RequestResponse<T = any> {
    data: T;
    status: number;
    headers: Headers;
}

export class ChiftRequestError extends Error {
    response: { data: any; status: number; headers: Headers };
    isChiftRequestError = true;

    constructor(status: number, data: any, headers: Headers) {
        super(`Request failed with status code ${status}`);
        this.name = 'ChiftRequestError';
        this.response = { data, status, headers };
    }
}

const isPlainObject = (value: unknown): value is Record<string, any> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

const buildQueryString = (params?: Record<string, any> | null): string => {
    if (!params) return '';
    const search = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;
        if (Array.isArray(value)) {
            for (const item of value) {
                if (item === undefined || item === null) continue;
                search.append(key, String(item));
            }
        } else if (value instanceof Date) {
            search.append(key, value.toISOString());
        } else if (isPlainObject(value)) {
            search.append(key, JSON.stringify(value));
        } else {
            search.append(key, String(value));
        }
    }
    const qs = search.toString();
    return qs ? `?${qs}` : '';
};

class InternalAPI {
    auth: AuthType;
    token?: TokenType;
    debug = false;
    relatedChainExecutionId?: string;
    connectionId?: string;
    integrationId?: string;
    baseURL: string;

    constructor(auth: AuthType) {
        this.auth = auth;
        this.baseURL = this.auth.baseUrl || Settings.BASE_URL;
    }

    private buildAuthHeaders = async (): Promise<Record<string, string>> => {
        const headers: Record<string, string> = {};

        if (this.connectionId) {
            headers['X-Chift-ConnectionId'] = this.connectionId;
        }

        if (this.integrationId) {
            headers['X-Chift-IntegrationId'] = this.integrationId;
        }

        if (this.relatedChainExecutionId) {
            headers['X-Chift-RelatedChainExecutionId'] = this.relatedChainExecutionId;
        }

        const now = new Date().getTime();
        const bufferMs = 30 * 1000;
        const tokenIsExpired = !this.token || this.token.expires_on * 1000 < now + bufferMs;

        if (tokenIsExpired) {
            await this.getToken();
        }

        if (!this.token?.access_token) {
            throw new Error('Token fetch did not return a valid token');
        }

        headers['Authorization'] = 'Bearer ' + this.token.access_token;
        return headers;
    };

    private resolveUrl = (url: string, params?: Record<string, any> | null): string => {
        const base = /^https?:\/\//i.test(url) ? url : `${this.baseURL}${url}`;
        return `${base}${buildQueryString(params)}`;
    };

    request = async <T = any>(config: RequestConfig): Promise<RequestResponse<T>> => {
        const authHeaders = await this.buildAuthHeaders();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...authHeaders,
            ...(config.headers || {}),
        };

        const method = (config.method || 'get').toUpperCase();
        const fullUrl = this.resolveUrl(config.url, config.params);

        const payload = config.data !== undefined ? config.data : config.body;
        let bodyString: string | undefined;
        if (payload !== undefined && method !== 'GET' && method !== 'HEAD') {
            bodyString = typeof payload === 'string' ? payload : JSON.stringify(payload);
        }

        const response = await fetch(fullUrl, {
            method,
            headers,
            body: bodyString,
        });

        const contentType = response.headers.get('content-type') || '';
        let data: any = undefined;
        if (response.status !== 204) {
            const text = await response.text();
            if (text.length > 0) {
                if (contentType.includes('application/json')) {
                    try {
                        data = JSON.parse(text);
                    } catch {
                        data = text;
                    }
                } else {
                    data = text;
                }
            }
        }

        if (!response.ok) {
            throw new ChiftRequestError(response.status, data, response.headers);
        }

        return { data, status: response.status, headers: response.headers };
    };

    get = <T = any>(url: string, config?: { params?: Record<string, any> | null }) =>
        this.request<T>({ url, method: 'get', params: config?.params });

    post = <T = any>(url: string, body?: unknown) =>
        this.request<T>({ url, method: 'post', data: body });

    patch = <T = any>(url: string, body?: unknown) =>
        this.request<T>({ url, method: 'patch', data: body });

    delete = <T = any>(url: string) => this.request<T>({ url, method: 'delete' });

    getToken = async () => {
        const maxRetries = 3;
        const baseDelayMs = 1500;
        let lastErr: any;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const tokenData: AuthType = {
                    clientId: this.auth.clientId,
                    clientSecret: this.auth.clientSecret,
                    accountId: this.auth.accountId,
                };
                if (this.auth.marketplaceId) {
                    tokenData['marketplaceId'] = this.auth.marketplaceId;
                }
                if (this.auth.envId) {
                    tokenData['envId'] = this.auth.envId;
                }

                const response = await fetch(`${this.baseURL}/token`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(tokenData),
                });

                if (response.status === 401) {
                    throw new Error('The provided credentials are not correct');
                }

                if (!response.ok) {
                    const text = await response.text();
                    throw new ChiftRequestError(response.status, text, response.headers);
                }

                this.token = (await response.json()) as TokenType;
                return;
            } catch (err: any) {
                lastErr = err;
                if (err?.message === 'The provided credentials are not correct') {
                    throw err;
                }

                if (attempt < maxRetries) {
                    const delayMs = baseDelayMs * attempt;
                    await sleep(delayMs);
                }
            }
        }

        throw lastErr || new Error('Token refresh failed');
    };

    getPaginationParams = (currPage: number) => {
        return {
            page: currPage,
            size: 100,
        };
    };

    public setRelatedChainExecutionId(chainExecutionId: string) {
        this.relatedChainExecutionId = chainExecutionId;
    }

    public async makeRequest<TResponse>(requestData: RequestData<TResponse>) {
        try {
            if (this.debug) {
                console.log(
                    `[DEBUG]: Executing operation ${requestData?.property} with url ${requestData.url} for consumer: ${requestData.consumerName}`
                );
            }
            let continuePagination = true;
            let items: any[] = [];
            let currentPage = 0;
            while (continuePagination) {
                currentPage++;
                let params: Record<string, any> = (requestData.params as Record<string, any>) || {};
                if (requestData.method === 'get') {
                    params = {
                        ...params,
                        ...this.getPaginationParams(currentPage),
                    };
                }
                const headers: Record<string, string> = {};
                if (requestData.rawData) {
                    headers['x-chift-raw-data'] = 'true';
                }
                if (requestData.clientRequestId) {
                    headers['x-chift-client-requestid'] = requestData.clientRequestId;
                }

                const res = await this.request({
                    url: requestData.url,
                    method: requestData.method,
                    params: params,
                    data: requestData.body !== undefined ? requestData.body : undefined,
                    headers: headers,
                });
                const { data } = res;
                if (data) {
                    if (requestData.method === 'get' && 'total' in data && 'items' in data) {
                        if (currentPage * 100 > data.total) {
                            continuePagination = false;
                        }
                    } else {
                        if (this.debug) {
                            console.log(`[DEBUG]: Data received: ${JSON.stringify(data)}`);
                        }
                        return data;
                    }
                    items = items.concat(data.items);
                } else {
                    return null;
                }
            }
            if (this.debug) {
                console.log(`[DEBUG]: Data received: ${JSON.stringify(items)}`);
            }
            return items;
        } catch (e: any) {
            if (e.response) {
                if (e.response.data) {
                    const error = { ...e.response.data, status_code: e.response.status };
                    const fullerror = {
                        error,
                        consumerId: requestData.consumerId,
                        consumerName: requestData.consumerName,
                        url: requestData.url,
                    };
                    //return error as TResponse;
                    throw fullerror;
                }
            }
            throw e;
        }
    }
}

export { InternalAPI };
