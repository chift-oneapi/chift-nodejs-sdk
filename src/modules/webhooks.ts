import { operations } from "../types/public-api/schema";
import { InternalAPI } from "./internalApi";
import { chiftOperations } from "../types/public-api/mappings";

const Webhooks = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getWebhookTypes = async () => {
        const { data } = await _internalApi.get<operations[chiftOperations["getWebhookTypes"]]["responses"][200]["content"]["application/json"]>('/webhooks/list');
        return data;
    }

    const getWebhooks = async () => {
        const { data } = await _internalApi.get<operations[chiftOperations["getWebhooks"]]["responses"][200]["content"]["application/json"]>('/webhooks');
        return data;
    }

    const registerWebhook = async (body: operations[chiftOperations["registerWebhook"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await _internalApi.post<operations[chiftOperations["createConsumer"]]["responses"][200]["content"]["application/json"]>('/webhooks', body);
        return data;
    }

    const getWebhookById = async (webhookId: string) => {
        const { data } = await _internalApi.get<operations[chiftOperations["getWebhookById"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}`);
        return data;
    }

    const updateWebhookById = async (webhookId: string, body: operations[chiftOperations["updateWebhookById"]]["requestBody"]["content"]["application/json"]) => {
        const { data } = await _internalApi.patch<operations[chiftOperations["updateConsumer"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}`, body);
        return data;
    }

    const unRegisterWebhook = async (webhookId: string) => {
        const { data } = await _internalApi.delete<operations[chiftOperations["unRegisterWebhook"]]["responses"][204]>(`/webhooks/${webhookId}`);
        return data;
    }

    const getWebhookLogsByWebhookId = async (webhookId: string) => {
        const { data } = await _internalApi.get<operations[chiftOperations["getWebhookLogsByWebhookId"]]["responses"][200]["content"]["application/json"]>(`/webhooks/${webhookId}/logs`);
        return data;
    }

    return {
        getWebhookTypes,
        registerWebhook,
        getWebhookById,
        updateWebhookById,
        unRegisterWebhook,
        getWebhookLogsByWebhookId,
        getWebhooks
    }
}


export {
    Webhooks
}
