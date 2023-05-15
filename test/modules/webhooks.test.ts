import { afterAll, beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BASE_URL,
    clientId: process.env.CHIFT_CLIENT_ID as string,
    clientSecret: process.env.CHIFT_CLIENT_SECRET as string,
    accountId: process.env.CHIFT_ACCOUNT_ID as string,
});

let webhook: any;

beforeAll(async () => {
    webhook = await client.Webhooks.registerWebhook({
        event: 'account.connection.created',
        url: 'https://test',
        signingsecret: 'secret',
    });
    expect(webhook).toHaveProperty('status', 'active');
    expect(webhook).toHaveProperty('webhookid', expect.any(String));
    expect(webhook).toHaveProperty('accountid', expect.any(String));
    expect(webhook).toHaveProperty('createdby');
    expect(webhook).toHaveProperty('createdon');
    expect(webhook).toHaveProperty('event', 'account.connection.created');
    expect(webhook).toHaveProperty('url', 'https://test');
    expect(webhook).toHaveProperty('status', 'active');
    expect(webhook).toHaveProperty('integrationid');
});

test('getWebhookTypes', async () => {
    const webhookTypes = await client.Webhooks.getWebhookTypes();
    expect(webhookTypes).toBeInstanceOf(Array);
    expect(webhookTypes.length).toBeGreaterThan(0);
    expect(webhookTypes[0]).toHaveProperty('event', expect.any(String));
    expect(webhookTypes[0]).toHaveProperty('api');
});

test('getWebhooks', async () => {
    const webhooks = await client.Webhooks.getWebhooks();
    expect(webhooks).toBeInstanceOf(Array);
    expect(webhooks.length).toBeGreaterThan(0);
    expect(webhooks[0]).toHaveProperty('webhookid', expect.any(String));
});

test('getWebhookById', async () => {
    const webhookWithId = await client.Webhooks.getWebhookById(webhook.webhookid);
    expect(webhookWithId).toHaveProperty('webhookid', webhook.webhookid);
    expect(webhookWithId).toHaveProperty('accountid', expect.any(String));
    expect(webhookWithId).toHaveProperty('createdby');
    expect(webhookWithId).toHaveProperty('createdon');
    expect(webhookWithId).toHaveProperty('event', expect.any(String));
    expect(webhookWithId).toHaveProperty('url', expect.any(String));
    expect(webhookWithId).toHaveProperty('status', expect.any(String));
    expect(webhookWithId).toHaveProperty('integrationid');
});

test('updateWebhookById', async () => {
    const updatedWebhook = await client.Webhooks.updateWebhookById(webhook.webhookid, {
        status: 'inactive',
    });
    expect(updatedWebhook).toHaveProperty('webhookid', expect.any(String));
    expect(updatedWebhook).toHaveProperty('accountid', expect.any(String));
    expect(updatedWebhook).toHaveProperty('createdby');
    expect(updatedWebhook).toHaveProperty('createdon');
    expect(updatedWebhook).toHaveProperty('event', 'account.connection.created');
    expect(updatedWebhook).toHaveProperty('url', 'https://test');
    expect(updatedWebhook).toHaveProperty('status', 'inactive');
    expect(updatedWebhook).toHaveProperty('integrationid');
});

test('getWebhookLogsByWebhookId', async () => {
    const webhookLogs = await client.Webhooks.getWebhookLogsByWebhookId(webhook.webhookid);
    expect(webhookLogs).toBeInstanceOf(Array);
});

afterAll(async () => {
    expect.assertions(1);
    try {
        await client.Webhooks.unRegisterWebhook(webhook.webhookid);
        await client.Webhooks.getWebhookById(webhook.webhookid);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            expect(e.message).toMatch('Request failed with status code 404');
            return;
        }

        throw e;
    }
});
