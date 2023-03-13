import { operations } from './schema';

export type chiftOperations= {
    "getConsumers": "consumers_get_consumers",
    "createConsumer": "consumers_create_consumer",
    "getConsumerById": "consumers_get_consumer",
    "updateConsumer": "consumers_update_consumer",
    "deleteConsumerById": "consumers_delete_consumer",
    "getConnectionsByConsumerId": "connections_get_connections",
    "createConnection": "connections_create_connection",
    "deleteConnectionById": "connections_delete_connection",
    "updateConnection": "connections_update_connection",
    "getSyncs": "syncs_get_syncs",
    "getIntegrations": "integrations_get_integrations",
    "getWebhookTypes": "webhooks_get_webhook_types",
    "getWebhooks": "webhooks_get_webhooks",
    "registerWebhook": "webhooks_create_webhook",
    "unRegisterWebhook" :"webhooks_delete_webhook",
    "getWebhookById": "webhooks_get_webhook",
    "updateWebhookById": "webhooks_update_webhook",
    "getWebhookLogsByWebhookId": "webhooks_get_webhook_logs",
    "getSync": "syncs_get_sync"
}