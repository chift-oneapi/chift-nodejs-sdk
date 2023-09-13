import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { ContextType } from '../types/sync';
import { Consumer } from './consumer';
import { Flow } from './flow';

const Sync = (internalApi: InternalAPI, body: components['schemas']['SyncItem']) => {
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
        console.log('undefined ?');
        if (flow) {
            console.log('on a le flux');
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
                trigger: context.trigger,
                config: context.config,
            });
        const myflow = Flow(_internalApi, createFlowData, data.syncid, data.consumers, process);
        return myflow;
    };

    return {
        createFlow,
        getFlows,
        getFlowByName,
        getFlowById,
        name,
        consumers,
        syncid,
    };
};

export { Sync };
