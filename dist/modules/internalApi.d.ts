import { AxiosRequestConfig } from 'axios';
import { AuthType, TokenType, RequestData } from '../types/api';
declare class InternalAPI {
    instance: import("axios").AxiosInstance;
    auth: AuthType;
    token?: TokenType;
    debug: boolean;
    constructor(auth: AuthType);
    getToken: () => Promise<void>;
    getPaginationParams: (currPage: number) => {
        page: number;
        size: number;
    };
    makeRequest<TResponse>(requestData: RequestData<TResponse>): Promise<any>;
    get: <T = any, R = import("axios").AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined) => Promise<R>;
    post: <T = any, R = import("axios").AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined) => Promise<R>;
    patch: <T = any, R = import("axios").AxiosResponse<T, any>, D = any>(url: string, data?: D | undefined, config?: AxiosRequestConfig<D> | undefined) => Promise<R>;
    delete: <T = any, R = import("axios").AxiosResponse<T, any>, D = any>(url: string, config?: AxiosRequestConfig<D> | undefined) => Promise<R>;
}
export { InternalAPI };
