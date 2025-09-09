export interface AuthType {
    clientId: string;
    clientSecret: string;
    accountId: string;
    envId?: string;
    baseUrl?: string;
    marketplaceId?: string;
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

export type AutoPaginatedParams<T> = Omit<Exclude<T, undefined>, 'page' | 'size'>;

export type RawDataOption = {
    rawData?: boolean;
};

export type ClientRequestOption = {
    clientRequestId?: string;
};
