import { RequestData } from '../types/api';

const customFactory = {
    get(name: string, resource: string, params?: any, rawData?: boolean): RequestData<any> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            params: params,
            rawData,
        };
    },
    post(
        name: string,
        resource: string,
        body: any,
        params?: any,
        clientRequestId?: string
    ): RequestData<any> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params,
            clientRequestId,
        };
    },
    patch(
        name: string,
        resource: string,
        body: any,
        params?: any,
        clientRequestId?: string
    ): RequestData<any> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params,
            clientRequestId,
        };
    },
    delete(name: string, resource: string, params?: any): RequestData<any> {
        return {
            method: 'delete',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            params: params,
        };
    },
};

export { customFactory };
