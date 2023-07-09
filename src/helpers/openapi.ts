import { InternalAPI } from '../modules/internalApi';
import { RequestFactory, ApiFor } from '../types/api';

export function createApiFor<TFactory extends RequestFactory>(
    factory: TFactory,
    internalApi: InternalAPI,
    consumerName: string,
    consumerId: string
) {
    return new Proxy(factory, {
        get(target: any, property) {
            return (...args: any[]) => {
                const requestData = target[property](...args);
                requestData.property = property;
                requestData.consumerName = consumerName;
                requestData.consumerId = consumerId;
                requestData.url = requestData.url.replace('{consumer_id}', consumerId);
                return internalApi.makeRequest(requestData);
            };
        },
    }) as unknown as ApiFor<TFactory>;
}
