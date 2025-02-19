import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';

const DataStores = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getDataStores = async () => {
        const { data }: { data: components['schemas']['DataStoreItem'][] } = await _internalApi.get(
            '/datastores'
        );
        return data;
    };

    const getConsumerDataStoreData = async (consumerId: string, datastoreId: string) => {
        const { data }: { data: components['schemas']['DataItemOut'][] } = await _internalApi.get(
            `/consumers/${consumerId}/datastore/${datastoreId}/data`
        );
        return data;
    };

    const createConsumerDataStoreData = async (
        consumerId: string,
        datastoreId: string,
        body: components['schemas']['DataItem']
    ) => {
        const { data }: { data: components['schemas']['DataItemOut'] } = await _internalApi.post(
            `/consumers/${consumerId}/datastore/${datastoreId}/data`,
            body
        );
        return data;
    };

    const updateConsumerDataStoreData = async (
        consumerId: string,
        datastoreId: string,
        datastoreDataId: string,
        body: components['schemas']['DataItem']
    ) => {
        const { data }: { data: components['schemas']['DataItemOut'] } = await _internalApi.patch(
            `/consumers/${consumerId}/datastore/${datastoreId}/data/${datastoreDataId}`,
            body
        );
        return data;
    };

    const deleteConsumerDataStoreData = async (
        consumerId: string,
        datastoreId: string,
        datastoreDataId: string
    ) => {
        await _internalApi.delete(
            `/consumers/${consumerId}/datastore/${datastoreId}/data/${datastoreDataId}`
        );
    };

    return {
        getDataStores,
        getConsumerDataStoreData,
        createConsumerDataStoreData,
        updateConsumerDataStoreData,
        deleteConsumerDataStoreData,
    };
};

export { DataStores };
