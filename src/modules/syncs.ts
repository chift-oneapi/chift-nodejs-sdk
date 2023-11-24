import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { Sync } from './sync';

const Syncs = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getSyncs = async () => {
        const { data }: { data: components['schemas']['ReadSyncItem'][] } = await _internalApi.get(
            '/syncs'
        );
        return data.map((sync) => Sync(_internalApi, sync));
    };

    const getSyncById = async (syncid: string) => {
        const { data }: { data: components['schemas']['ReadSyncItem'] } = await _internalApi.get(
            `/syncs/${syncid}`
        );
        return Sync(_internalApi, data);
    };

    return {
        getSyncs,
        getSyncById,
    };
};

export { Syncs };
