import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

const consumerName = 'test consumer 2';
const email = 'support@chift.eu';
const redirect_url = 'https://chift.eu';

let syncConsumer: any;
let consumer: any;
let connection: any;

beforeAll(async () => {
    consumer = await client.Consumers.createConsumer({
        email,
        redirect_url,
        name: consumerName,
    });
    syncConsumer = await client.Consumers.getConsumerById(
        process.env.CHIFT_SYNC_CONSUMER_ID as string
    );
});

test('createConnection', async () => {
    const body = { integrationid: 1000, name: 'odoo test sdk' };
    const result = await consumer.createConnection(body);
    expect(result).toHaveProperty('url', expect.any(String));
});

let connections: components['schemas']['backbone_api__app__routers__connections__ConnectionItem'][];

test('getConnections', async () => {
    connections = await syncConsumer.getConnections();
    expect(connections).toBeInstanceOf(Array);
});

test.skip('updateConnection', async () => {
    const updatedConnection = await syncConsumer.updateConnection(connections[0]?.connectionid, {
        name: 'updated connection name',
    });
    expect(updatedConnection).toHaveProperty('name', 'updated connection name');
});

test.skip('deleteConnection', async () => {
    await consumer.deleteConnection(connection.connectionId);
});

test('getSyncUrl', async () => {
    const result = await syncConsumer.getSyncUrl({
        syncid: process.env.CHIFT_TEST_SYNC_ID as string,
        integrationids: [],
    });
    expect(result).toHaveProperty('url', expect.any(String));
});

test('getSyncData', async () => {
    const syncData = await syncConsumer.getSyncData(process.env.CHIFT_TEST_SYNC_ID as string);
    expect(syncData).toBeTruthy();
});
