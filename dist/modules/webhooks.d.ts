import { operations } from "../types/public-api/schema";
import { chiftOperations } from "../types/public-api/mappings";
declare class Webhooks {
    private _internalApi;
    constructor(internalApi: any);
    getWebhookTypes: () => Promise<{
        event: string;
        api?: string | undefined;
    }[]>;
    getWebhooks: () => Promise<{
        webhookid: string;
        accountid: string;
        createdby?: string | undefined;
        createdon: string;
        event: string;
        url: string;
        status: "active" | "inactive";
        integrationid?: number | undefined;
    }[]>;
    registerWebhook: (body: operations[chiftOperations["registerWebhook"]]["requestBody"]["content"]["application/json"]) => Promise<{
        consumerid: string;
        name: string;
        email?: string | undefined;
        redirect_url?: string | undefined;
    }>;
    getWebhookById: (webhookId: string) => Promise<{
        webhookid: string;
        accountid: string;
        createdby?: string | undefined;
        createdon: string;
        event: string;
        url: string;
        status: "active" | "inactive";
        integrationid?: number | undefined;
    }>;
    updateWebhookById: (webhookId: string, body: operations[chiftOperations["updateWebhookById"]]["requestBody"]["content"]["application/json"]) => Promise<{
        consumerid: string;
        name: string;
        email?: string | undefined;
        redirect_url?: string | undefined;
    }>;
    unRegisterWebhook: (webhookId: string) => Promise<never>;
    getWebhookLogsByWebhookId: (webhookId: string) => Promise<{
        webhooklogid: string;
        webhookid: string;
        event: string;
        url: string;
        accountid: string;
        createdon: string;
        httpstatus: number;
        integrationid?: number | undefined;
    }[]>;
}
export { Webhooks };
