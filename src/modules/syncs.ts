import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { Sync } from './sync';

const Syncs = (
    internalApi: InternalAPI
): {
    createSync: (
        body?: components['schemas']['CreateSyncItem']
    ) => Promise<ReturnType<typeof Sync>>;
    getSyncs: () => Promise<ReturnType<typeof Sync>[]>;
    getSyncById: (syncid: string) => Promise<ReturnType<typeof Sync>>;
    updateSync: (
        body?: components['schemas']['CreateSyncItem']
    ) => Promise<ReturnType<typeof Sync>>;
} => {
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

    const createSync = async (body?: components['schemas']['CreateSyncItem']) => {
        const {
            data,
        }: {
            data: components['schemas']['ReadSyncItem'];
        } = await _internalApi.post('/syncs', body);
        return Sync(_internalApi, data);
    };

    const updateSync = async (body?: components['schemas']['CreateSyncItem']) => {
        const {
            data,
        }: {
            data: components['schemas']['ReadSyncItem'];
        } = await _internalApi.patch('/syncs', body);
        return Sync(_internalApi, data);
    };

    return {
        createSync,
        getSyncs,
        getSyncById,
        updateSync,
    };
};

export { Syncs };
