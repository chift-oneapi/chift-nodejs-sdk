import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { ContextType } from '../types/sync';
import { Consumer } from './consumer';
import { Flow } from './flow';

const Sync = (internalApi: InternalAPI, body: components['schemas']['ReadSyncItem']) => {
    const _internalApi: InternalAPI = internalApi;
    const data = body;
    const name = data.name;
    const consumers = data.consumers;
    const syncid = data.syncid;

    const getFlows = () => {
        return data.flows.map((flow) => Flow(_internalApi, flow, data.syncid, data.consumers));
    };

    const getFlowByName = (name: string) => {
        const flow = data.flows.find((flow) => flow.name.toLowerCase() === name.toLowerCase());
        if (flow) {
            return Flow(_internalApi, flow, data.syncid, data.consumers);
        }
        return undefined;
    };

    const getFlowById = (id: string) => {
        const flow = data.flows.find((flow) => flow.id === id);
        if (flow) {
            return Flow(_internalApi, flow, data.syncid, data.consumers);
        }
        return undefined;
    };

    /**
     * Internal use: Used to create flow based on code and triggers.
     * @param context
     * @param process
     * @returns flow
     */
    const createFlow = async (
        context: ContextType,
        process?: (consumer: typeof Consumer, context: any) => any
    ) => {
        const executionData = context.execution.data || {};
        if (context.execution.type === 'code') {
            const fullFunc = process?.toString();
            const bodyFunc = fullFunc?.slice(fullFunc.indexOf('{') + 1, fullFunc.lastIndexOf('}'));
            executionData['code'] = bodyFunc;
        }

        const { data: createFlowData }: { data: components['schemas']['ReadFlowItem'] } =
            await _internalApi.post(`/syncs/${data.syncid}/flows`, {
                name: context.name,
                description: context.description,
                execution: {
                    type: context.execution.type,
                    data: executionData,
                },
                triggers: context.triggers,
                config: context.config,
            });
        const myflow = Flow(_internalApi, createFlowData, data.syncid, data.consumers, process);
        return myflow;
    };

    const sendCustomEvent = async (
        flowid: string,
        eventData: components['schemas']['PostSyncFlowEvent']
    ) => {
        const { data }: { data: components['schemas']['TriggerResponse'] } =
            await _internalApi.post(`/syncs/${syncid}/flows/${flowid}/event`, eventData);
        return data;
    };

    const getConsumerExecutions = async (consumerid: string, flowid: string) => {
        const { data }: { data: components['schemas']['ChainExecutionItem'][] } =
            await _internalApi.get(
                `/consumers/${consumerid}/syncs/${syncid}/flows/${flowid}/executions`
            );
        return data;
    };

    const getExecution = async (flowid: string, executionid: string) => {
        const { data }: { data: components['schemas']['ChainExecutionItem'] } =
            await _internalApi.get(`/syncs/${syncid}/flows/${flowid}/executions/${executionid}`);
        return data;
    };

    return {
        createFlow,
        getFlows,
        getFlowByName,
        getFlowById,
        name,
        consumers,
        syncid,
        sendCustomEvent,
        getConsumerExecutions,
        getExecution,
    };
};

export { Sync };
