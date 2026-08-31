import { RequestData, RawDataOption, ClientRequestOption } from '../types/api';

const customFactory = {
    get(name: string, resource: string, params?: any, options?: RawDataOption): RequestData<any> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            params: params,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    post(
        name: string,
        resource: string,
        body: any,
        params?: any,
        options?: ClientRequestOption
    ): RequestData<any> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    patch(
        name: string,
        resource: string,
        body: any,
        params?: any,
        options?: ClientRequestOption
    ): RequestData<any> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
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
