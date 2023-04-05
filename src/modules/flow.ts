import { components } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { Consumers } from "./consumers";
import { Consumer } from "./consumer";

const Flow = (internalApi: any, body: components["schemas"]["ReadFlowItem"], syncid: string, consumers: string[] ) => {
    const _internalApi: InternalAPI = internalApi;
    const data: components["schemas"]["ReadFlowItem"] = body;
    const _syncid = syncid;
    const _consumers = consumers;

    /*
    const execute = async () => {
        _internalApi.debug = true;
        for (let i = 0; i < _consumers.length; i++) {
            // we do not care about the customer
            const consumer = await Consumers(_internalApi).getConsumerById(_consumers[i]);
            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            const execFunc = new AsyncFunction("return new Promise((resolve) => { resolve(code); })");
            const test = async () => {
                execFunc();
            };
            test();
        }
        _internalApi.debug = false;
    }
    */

    const sendEvent = async (payload: any) => {
        const { data : response} = await _internalApi.post<components["schemas"]["LinkSyncItem"]>(`/syncs/${_syncid}/flows/${data.id}/event`, payload);
        return response;
    }

    const execute = async (testData: any = {}) => {
        // first create the process in Chift (it will check if it's already created or not and execute it)
        const { data : createFlowData} = await _internalApi.post<components["schemas"]["LinkSyncItem"]>(`/syncs/${_syncid}/flows`, {
            name: data.name,
            trigger: {
                type: data.trigger.type,
                data: data.trigger.data
            },
            code: data.code
        });
        await sendEvent(testData);
    }

    const localExecution = async (process: (consumer: any) => any) => {
        _internalApi.debug = true;
        for (let i = 0; i < _consumers.length; i++) {
            // we do not care about the customer
            const consumer = await Consumers(_internalApi).getConsumerById(_consumers[i]);
            try {
                await process(consumer);
            } catch (err) {
                throw err;
            }
        }
        _internalApi.debug = false;
    }

    const executeLocal = async (process: (consumer: typeof Consumer) => any, log : boolean = false) => {
        if (log) {
            // create executions on the platform to add the logs to the server
            const { data : response} = await _internalApi.post<components["schemas"]["SimpleResponse"]>(`/syncs/${_syncid}/flows/${data.id}/local`, { type: "START" });
            const { executionid, chainexecutionid } = response.data;
            _internalApi.setRelatedChainExecutionId(chainexecutionid);
            try {
                await localExecution(process);
                const { data : response2} = await _internalApi.post<components["schemas"]["SimpleResponse"]>(`/syncs/${_syncid}/flows/${data.id}/local`, { type: "END", executionid: executionid, chainexecutionid: chainexecutionid });
            } catch (err : any) {
                if (err.error) {
                    // it's an error from the one api
                    const error_message = `Error when executing request with url ${err.url} for consumer ${err.consumerName} (${err.consumerId})`;
                    console.log(`[ERROR]: ${error_message}: ${JSON.stringify(err.error)}`)
                    const { data : response2} = await _internalApi.post<components["schemas"]["SimpleResponse"]>(`/syncs/${_syncid}/flows/${data.id}/local`, { type: "END", executionid: executionid, chainexecutionid: chainexecutionid, error: true, error_message : error_message, technical_error_message:  JSON.stringify(err.error)});
                } else {
                    console.log("[ERROR]: " + err.toString());
                    const { data : response2} = await _internalApi.post<components["schemas"]["SimpleResponse"]>(`/syncs/${_syncid}/flows/${data.id}/local`, { type: "END", executionid: executionid, chainexecutionid: chainexecutionid, error: true, technical_error_message : err.toString() });
                }
            }
            _internalApi.setRelatedChainExecutionId("");
        } else {
            try {
                await localExecution(process);
            } catch (err: any) {
                if (err.error) {
                    const error_message = `Error when executing request with url ${err.url} for consumer ${err.consumerName} (${err.consumerId})`;
                    console.log(`[ERROR] ${error_message}: ${JSON.stringify(err.error)}`)
                } else {                
                    console.log("[ERROR]: " + err.toString());
                }
            }
        }
    }

    return {
        execute,
        executeLocal
    }
}

export {
    Flow
}