import { AuthType, TokenType } from '../types/api';
declare class InternalAPI {
    instance: import("axios").AxiosInstance;
    auth: AuthType;
    token?: TokenType;
    constructor(auth: AuthType);
    getToken: () => Promise<void>;
    get: (url: string) => Promise<import("axios").AxiosResponse<any, any>>;
    post: <T = any, R = import("axios").AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: import("axios").AxiosRequestConfig<D> | undefined) => Promise<R>;
}
export { InternalAPI };
