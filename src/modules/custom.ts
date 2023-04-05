import { operations, components } from "../types/public-api/schema";
import { RequestData } from "../types/api";

const customFactory = {
    get(name: string, resource: string, params?: any): RequestData<any> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            params: params
        }
    },
    post(name: string, resource: string, body: any, params?: any): RequestData<any> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params
        }
    },
    patch(name: string, resource: string, body: any, params?: any): RequestData<any> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            body: body,
            params: params
        }
    },
    delete(name: string, resource: string, params?: any): RequestData<any> {
        return {
            method: 'delete',
            url: `/consumers/{consumer_id}/custom/${name}/${resource}`,
            params: params
        }
    },
}

export {
    customFactory,
}