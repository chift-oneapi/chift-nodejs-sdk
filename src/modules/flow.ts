import { components } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { Consumers } from './consumers';
import { Consumer } from './consumer';
import { SimpleResponseModel } from '../types/sync';

const Flow = (
    internalApi: any,
    body: components['schemas']['ReadFlowItem'],
    syncid: string,
    consumers: string[],
    process?: (consumer: any, context: any) => any
) => {
    const _internalApi: InternalAPI = internalApi;
    const data: components['schemas']['ReadFlowItem'] = body;
    const _syncid = syncid;
    const _consumers = consumers;
    const _process = process;

    const sendEvent = async (payload: components['schemas']['PostSyncFlowEvent']) => {
        const { data: response }: { data: components['schemas']['TriggerResponse'] } =
            await _internalApi.post(`/syncs/${_syncid}/flows/${data.id}/event`, payload);
        return response;
    };

    const getExecution = async (executionId: string) => {
        const { data: response }: { data: components['schemas']['ChainExecutionItem'] } =
            await _internalApi.get(`/syncs/${_syncid}/flows/${data.id}/executions/${executionId}`);
        return response;
    };

    const getConsumerExecutions = async (consumerId: string) => {
        const { data: response }: { data: components['schemas']['ChainExecutionItem'][] } =
            await _internalApi.get(
                `/consumers/${consumerId}/syncs/${_syncid}/flows/${data.id}/executions`
            );
        return response;
    };

    /**
     * Internal use: Function used to execute a flow while testing locally or by calling the sendEvent function
     */
    const execute = async ({ testData = {}, context = {} }: any) => {
        // first create the process in Chift (it will check if it's already created or not and execute it)
        await _internalApi.post(`/syncs/${_syncid}/flows`, {
            name: data.name,
            description: data.description,
            execution: data.execution,
            triggers: data.triggers,
            config: data.config,
        });
        // execute locally or remotely by sending an event to execute the flow
        if (context.local) {
            // when you execute locally you need to have a process defined
            const logs = context.logs || false;
            if (_process) executeLocal(_process, logs);
            else throw Error('Process is not defined it cannot be executed');
        } else {
            await sendEvent(testData);
        }
    };

    /**
     * Internal use: Function used to execute a flow locally based on the configured consumers.
     */
    const localExecution = async (process: (consumer: any, context: any) => any) => {
        _internalApi.debug = true;
        for (let i = 0; i < _consumers.length; i++) {
            // we do not care about the customer
            let consumer;
            try {
                consumer = await Consumers(_internalApi).getConsumerById(_consumers[i]);
            } catch (err) {
                console.log(
                    `Cannot run for consumer ${_consumers[i]} as it cannot be found; probably part of an external account ? Use the platform to debug.`
                );
            }
            if (consumer) {
                const syncData = await consumer.getSyncData(_syncid);
                const flow = syncData.enabled_flows?.find((flow) => flow.id === data.id);
                if (flow && syncData.status === 'active') {
                    const context = {
                        ...syncData,
                        flow_id: flow.id,
                        flow_name: flow.name,
                        flow_values: flow.values,
                        flow_config: flow.config,
                    };
                    delete context['enabled_flows'];
                    await process(consumer, context);
                } else {
                    console.log(
                        `Cannot run for consumer ${_consumers[i]} as the flow is not activated or not correctly configured`
                    );
                }
            }
        }
        _internalApi.debug = false;
    };

    /**
     * Internal use: Function used to execute a flow locally for debugging purposes. It will create the executions server-side on Chift to be able to follow-up the execution through Chift's UI.
     * It will call localExecution to execute the flow for the configured consumers
     */
    const executeLocal = async (
        process: (consumer: typeof Consumer, context: any) => any,
        log = false
    ) => {
        if (log) {
            // create executions on the platform to add the logs to the server
            const { data: response }: { data: SimpleResponseModel } = await _internalApi.post(
                `/syncs/${_syncid}/flows/${data.id}/local`,
                { type: 'START' }
            );
            if (response.data) {
                const { executionid, chainexecutionid } = response.data;
                _internalApi.setRelatedChainExecutionId(chainexecutionid);
                try {
                    await localExecution(process);
                    await _internalApi.post(`/syncs/${_syncid}/flows/${data.id}/local`, {
                        type: 'END',
                        executionid: executionid,
                        chainexecutionid: chainexecutionid,
                    });
                } catch (err: any) {
                    if (err.error) {
                        // it's an error from the one api
                        const error_message = `Error when executing request with url ${err.url} for consumer ${err.consumerName} (${err.consumerId})`;
                        console.log(`[ERROR]: ${error_message}: ${JSON.stringify(err.error)}`);
                        await _internalApi.post(`/syncs/${_syncid}/flows/${data.id}/local`, {
                            type: 'END',
                            executionid: executionid,
                            chainexecutionid: chainexecutionid,
                            error: true,
                            error_message: error_message,
                            technical_error_message: JSON.stringify(err.error),
                        });
                    } else {
                        console.log('[ERROR]: ' + err.toString());
                        await _internalApi.post(`/syncs/${_syncid}/flows/${data.id}/local`, {
                            type: 'END',
                            executionid: executionid,
                            chainexecutionid: chainexecutionid,
                            error: true,
                            technical_error_message: err.toString(),
                        });
                    }
                }
                _internalApi.setRelatedChainExecutionId('');
            } else {
                throw Error('Execution could not be executed');
            }
        } else {
            try {
                await localExecution(process);
            } catch (err: any) {
                if (err.error) {
                    const error_message = `Error when executing request with url ${err.url} for consumer ${err.consumerName} (${err.consumerId})`;
                    console.log(`[ERROR] ${error_message}: ${JSON.stringify(err.error)}`);
                } else {
                    console.log('[ERROR]: ' + err.toString());
                }
            }
        }
    };

    return {
        execute,
        getExecution,
        getConsumerExecutions,
        executeLocal,
        flowId: data.id,
        name: data.name,
    };
};

export { Flow };
