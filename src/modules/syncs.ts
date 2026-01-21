import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { Sync } from './sync';

export type SyncsAPI = {
    createSync: (
        body?: components['schemas']['CreateSyncItem']
    ) => Promise<ReturnType<typeof Sync>>;
    getSyncs: () => Promise<ReturnType<typeof Sync>[]>;
    getSyncById: (syncid: string) => Promise<ReturnType<typeof Sync>>;
    sendCustomEvent: (
        syncid: string,
        flowid: string,
        body: components['schemas']['PostSyncFlowEvent']
    ) => Promise<components['schemas']['TriggerResponse']>;
    getConsumerExecutions: (
        consumerid: string,
        syncid: string,
        flowid: string
    ) => Promise<components['schemas']['ChainExecutionItem'][]>;
    getExecution: (
        syncid: string,
        flowid: string,
        executionid: string
    ) => Promise<components['schemas']['ChainExecutionItem']>;
};

const Syncs = (internalApi: InternalAPI): SyncsAPI => {
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

    const sendCustomEvent = async (
        syncid: string,
        flowid: string,
        body: components['schemas']['PostSyncFlowEvent']
    ) => {
        const { data }: { data: components['schemas']['TriggerResponse'] } =
            await _internalApi.post(`/syncs/${syncid}/flows/${flowid}/event`, body);
        return data;
    };

    const getConsumerExecutions = async (consumerid: string, syncid: string, flowid: string) => {
        const { data }: { data: components['schemas']['ChainExecutionItem'][] } =
            await _internalApi.get(
                `/consumers/${consumerid}/syncs/${syncid}/flows/${flowid}/executions`
            );
        return data;
    };

    const getExecution = async (syncid: string, flowid: string, executionid: string) => {
        const { data }: { data: components['schemas']['ChainExecutionItem'] } =
            await _internalApi.get(`/syncs/${syncid}/flows/${flowid}/executions/${executionid}`);
        return data;
    };

    return {
        createSync,
        getSyncs,
        getSyncById,
        sendCustomEvent,
        getConsumerExecutions,
        getExecution,
    };
};

export { Syncs };
