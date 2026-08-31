export interface AuthType {
    clientId: string;
    clientSecret: string;
    accountId: string;
    envId?: string;
    baseUrl?: string;
    marketplaceId?: string;
    /**
     * Page size used when auto-paginating list endpoints (default: 100).
     * The Chift API currently accepts values up to 1000.
     */
    pageSize?: number;
}

export interface TokenType {
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_on: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RequestData<TResponse> = {
    method: string;
    property?: string;
    consumerName?: string;
    consumerId?: string;
    url: string;
    params?: unknown;
    body?: unknown;
    rawData?: boolean;
    clientRequestId?: string;
};

export type RequestFactory = { [key: string]: (...args: any) => RequestData<any> };

export type ApiFor<TFactory extends RequestFactory> = {
    [key in keyof TFactory]: TFactory[key] extends (
        ...args: infer TArgs
    ) => RequestData<infer TResponse>
        ? (...args: TArgs) => Promise<TResponse>
        : never;
};

/**
 * Params for auto-paginated list endpoints. The SDK manages `page` itself and
 * always returns the full list; `size` only tunes how many items are fetched
 * per request (it is not a limit), overriding the client-level `pageSize`.
 */
export type AutoPaginatedParams<T> = Omit<Exclude<T, undefined>, 'page'>;

export type RawDataOption = {
    rawData?: boolean;
};

export type ClientRequestOption = {
    clientRequestId?: string;
};
