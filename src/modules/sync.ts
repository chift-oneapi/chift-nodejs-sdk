import { components } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { TriggerType } from "../types/sync";
import { Consumers } from "./consumers";
import { Consumer } from "./consumer";
import { Flow } from "./flow";


const Sync = (internalApi : InternalAPI, body: components["schemas"]["SyncItem"] ) => {

    const _internalApi : InternalAPI = internalApi;
    const data = body;
    const name = data.name;
    const consumers = data.consumers;
    const syncid = data.syncid


    const getFlows = () => {
        return data.flows.map(flow => Flow(_internalApi, flow, data.syncid, data.consumers));
    }

    const getFlowByName = (name: string) =>  {
        const flow = data.flows.find(flow => flow.name.toLowerCase() === name.toLowerCase());
        if (flow) {
            return Flow(_internalApi, flow, data.syncid, data.consumers);
        }
        return undefined;
    }

    const getFlowById = (id: string) => {
        const flow = data.flows.find(flow => flow.id === id);
        if (flow) {
            return Flow(_internalApi, flow, data.syncid, data.consumers);
        }
        return undefined;
    }
    

    const createFlow = async(name: string, trigger: TriggerType, process: (consumer: typeof Consumer) => any, context: any = {}) =>  {
        var fullFunc = process.toString(); 
        var bodyFunc = fullFunc.slice(fullFunc.indexOf("{") + 1, fullFunc.lastIndexOf("}"));
        const { data : createFlowData} = await _internalApi.post<components["schemas"]["ReadFlowItem"]>(`/syncs/${data.syncid}/flows`, {
            name: name,
            trigger: {
                type: trigger.type,
                data: trigger.data
            },
            code: bodyFunc
        });
        const myflow = Flow(_internalApi, createFlowData, data.syncid, data.consumers);
        if (context) {
            if (context.local) {
                const logs = context.logs || false;
                myflow.executeLocal(process, logs);
            }
        }
        return myflow;
    }
    

    

    

    return {
        createFlow,
        getFlows,
        getFlowByName,
        getFlowById,
        name,
        consumers,
        syncid
    }
}




export {
    Sync
}