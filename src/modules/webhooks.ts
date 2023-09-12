import { operations } from '../types/public-api/schema';
import { InternalAPI } from './internalApi';
import { chiftOperations } from '../types/public-api/mappings';

const Webhooks = (internalApi: InternalAPI) => {
    const _internalApi: InternalAPI = internalApi;

    const getWebhookTypes = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getWebhookTypes']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/webhooks/list');
        return data;
    };

    const getWebhooks = async () => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getWebhooks']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get('/webhooks');
        return data;
    };

    const registerWebhook = async (
        body: operations[chiftOperations['registerWebhook']]['requestBody']['content']['application/json']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['createConsumer']]['responses'][200]['content']['application/json'];
        } = await _internalApi.post('/webhooks', body);
        return data;
    };

    const getWebhookById = async (webhookId: string) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getWebhookById']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/webhooks/${webhookId}`);
        return data;
    };

    const updateWebhookById = async (
        webhookId: string,
        body: operations[chiftOperations['updateWebhookById']]['requestBody']['content']['application/json']
    ) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['updateConsumer']]['responses'][200]['content']['application/json'];
        } = await _internalApi.patch(`/webhooks/${webhookId}`, body);
        return data;
    };

    const unRegisterWebhook = async (webhookId: string) => {
        const {
            data,
        }: { data: operations[chiftOperations['unRegisterWebhook']]['responses'][204] } =
            await _internalApi.delete(`/webhooks/${webhookId}`);
        return data;
    };

    const getWebhookLogsByWebhookId = async (webhookId: string) => {
        const {
            data,
        }: {
            data: operations[chiftOperations['getWebhookLogsByWebhookId']]['responses'][200]['content']['application/json'];
        } = await _internalApi.get(`/webhooks/${webhookId}/logs`);
        return data;
    };

    return {
        getWebhookTypes,
        registerWebhook,
        getWebhookById,
        updateWebhookById,
        unRegisterWebhook,
        getWebhookLogsByWebhookId,
        getWebhooks,
    };
};

export { Webhooks };
