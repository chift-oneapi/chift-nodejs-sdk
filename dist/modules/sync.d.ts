import { components } from "../types/public-api/schema";
import { TriggerType, ContextType } from "../types/sync";
import { Consumer } from "./consumer";
declare class Sync {
    private _internalApi;
    private data;
    constructor(_internalApi: any, body: components["schemas"]["SyncItem"]);
    flow(name: string, trigger: TriggerType, process: (consumer: Consumer) => any, context?: ContextType): Promise<{
        message: string;
    } | undefined>;
    private executeFlow;
    toString(): string;
}
export { Sync };
