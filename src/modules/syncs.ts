import { components, operations } from '../types/public-api/schema';
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
    getSyncExecutions: (
        syncid: string,
        params?: operations['syncs_get_sync_executions']['parameters']['query']
    ) => Promise<components['schemas']['ChiftPage_SyncExecutionItem_']>;
    getFlowSettings: (
        syncid: string,
        flowid: string,
        params?: operations['syncs_get_flow_settings']['parameters']['query']
    ) => Promise<components['schemas']['FlowSettingsResponse']>;
    executeFlow: (
        syncid: string,
        flowid: string,
        body: components['schemas']['ExecuteFlowRequest']
    ) => Promise<components['schemas']['ExecuteFlowResponse']>;
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

    const getSyncExecutions = async (
        syncid: string,
        params?: operations['syncs_get_sync_executions']['parameters']['query']
    ) => {
        const { data }: { data: components['schemas']['ChiftPage_SyncExecutionItem_'] } =
            await _internalApi.get(`/syncs/${syncid}/executions`, { params });
        return data;
    };

    const getFlowSettings = async (
        syncid: string,
        flowid: string,
        params?: operations['syncs_get_flow_settings']['parameters']['query']
    ) => {
        const { data }: { data: components['schemas']['FlowSettingsResponse'] } =
            await _internalApi.get(`/syncs/${syncid}/flows/${flowid}/settings`, { params });
        return data;
    };

    const executeFlow = async (
        syncid: string,
        flowid: string,
        body: components['schemas']['ExecuteFlowRequest']
    ) => {
        const { data }: { data: components['schemas']['ExecuteFlowResponse'] } =
            await _internalApi.post(`/syncs/${syncid}/flows/${flowid}/execute`, body);
        return data;
    };

    return {
        createSync,
        getSyncs,
        getSyncById,
        sendCustomEvent,
        getConsumerExecutions,
        getExecution,
        getSyncExecutions,
        getFlowSettings,
        executeFlow,
    };
};

export { Syncs };
