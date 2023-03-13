import { operations, components } from "../types/public-api/schema";
import { chiftOperations } from "../types/public-api/mappings";
declare class Consumer {
    private _internalApi;
    consumerid: string;
    redirect_url?: string;
    name: string;
    email?: string;
    private data;
    pos: any;
    invoicing: any;
    accounting: any;
    ecommerce: any;
    constructor(_internalApi: any, body: operations[chiftOperations["getConsumerById"]]["responses"][200]["content"]["application/json"]);
    getConnections(): Promise<{
        connectionid: string;
        name: string;
        integration: string;
        integrationid: number;
        api: string;
        data?: Record<string, never> | undefined;
        status: "active" | "inactive";
    }[]>;
    createConnection(body?: components["schemas"]["PostConnectionItem"]): Promise<{
        url: string;
    }>;
    updateConnection(connectionId: string, body?: components["schemas"]["PatchConnectionItem"]): Promise<{
        url: string;
    }>;
    deleteConnection(connectionId: string): Promise<never>;
    getSyncUrl(body: components["schemas"]["CreateConsumerSyncItem"]): Promise<{
        url: string;
    }>;
}
export { Consumer };
