import { components } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { TriggerType, ContextType } from "../types/sync";
import { Consumers } from "./consumers";
import { Consumer } from "./consumer";

class Sync {
    private _internalApi: InternalAPI;
    private data: components["schemas"]["SyncItem"];

    constructor(_internalApi: any, body: components["schemas"]["SyncItem"]) {
        this._internalApi = _internalApi;
        this.data = body;
    }

    public async flow(name: string, trigger: TriggerType, process: (consumer: Consumer) => any, context?: ContextType) {
        var fullFunc = process.toString(); 
        var bodyFunc = fullFunc.slice(fullFunc.indexOf("{") + 1, fullFunc.lastIndexOf("}"));
        if (context?.mode == "debug") {
            this.executeFlow(process);
        } else {
            console.log("ici ???")
            const { data } = await this._internalApi.post<components["schemas"]["LinkSyncItem"]>(`/syncs/${this.data.syncid}/flows`, {
                name: name,
                trigger: {
                    type: trigger.type,
                    data: trigger.data
                },
                code: bodyFunc
            });
            return {
                "message": "The flow was correctly created."
            };
        }
    }

    private async executeFlow(process: (consumer: Consumer) => any) {
        this._internalApi.debug = true;
        for (let i = 0; i < this.data.consumers.length; i++) {
            // we do not care about the customer
            const consumer = await new Consumers(this._internalApi).getConsumerById(this.data.consumers[i]);
            await process(consumer);
        }
        this._internalApi.debug = false;
    }


    public toString() {
        return JSON.stringify(this.data);
    }


}




export {
    Sync
}