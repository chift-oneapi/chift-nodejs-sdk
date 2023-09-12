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

    return {
        getDataStores,
    };
};

export { DataStores };
