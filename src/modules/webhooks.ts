import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";

class Webhooks {
    private _internalApi: InternalAPI;

    constructor(internalApi: any) {
        this._internalApi = internalApi;
    }

    getWebhookTypes = async () => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getWebhookTypes"]]["responses"][200]["content"]["application/json"]>('/webhooks/list');
        return data;
    }

    getWebhooks = async () => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getWebhooks"]]["responses"][200]["content"]["application/json"]>('/webhooks');
        return data;
    }

    registerWebhook = async (body: operations[chiftOperations["registerWebhook"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await this._internalApi.post<operations[chiftOperations["createConsumer"]]["responses"][200]["content"]["application/json"]>('/webhooks', body);
        return data;
    }

    getWebhookById = async (webhookId: string) => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getWebhookById"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}`);
        return data;
    }

    updateWebhookById = async (webhookId: string, body: operations[chiftOperations["updateWebhookById"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await this._internalApi.patch<operations[chiftOperations["updateConsumer"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}`, body);
        return data;
    }

    unRegisterWebhook = async (webhookId: string) => {
        const { data } = await this._internalApi.delete<operations[chiftOperations["unRegisterWebhook"]]["responses"][204]>(`/webhooks/${webhookId}`);
        return data;
    }

    getWebhookLogsByWebhookId = async (webhookId: string) => {
        const { data } = await this._internalApi.get<operations[chiftOperations["getWebhookLogsByWebhookId"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}/logs`);
        return data;
    }
}


export {
    Webhooks
}
