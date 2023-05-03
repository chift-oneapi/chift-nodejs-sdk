import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BASE_URL,
    clientId: process.env.CHIFT_CLIENT_ID as string,
    clientSecret: process.env.CHIFT_CLIENT_SECRET as string,
    accountId: process.env.CHIFT_ACCOUNT_ID as string,
});

const consumerName = 'test consumer';
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

    syncConsumer = await client.Consumers.getConsumerById(process.env.CHIFT_CONSUMER_ID as string);
    console.log('syncConsumer', syncConsumer);
});

test.only('createConnection', async () => {
    // TODO: test with credentials
    const body = { integrationid: 1000, name: 'odoo test sdk' };
    const result = await consumer.createConnection(body);
    expect(result).toHaveProperty('url', expect.any(String));
});

test('getConnections', async () => {
    const connections = await consumer.getConnections();
    expect(connections).toBeInstanceOf(Array);
});

// TODO: create connection first
test.skip('updateConnection', async () => {
    const updatedConnection = await consumer.updateConnection(connection.connectionId, {
        name: 'updated connection name',
    });
    expect(updatedConnection).toHaveProperty('name', 'updated connection name');
});
// TODO: create connection first
test.skip('deleteConnection', async () => {
    await consumer.deleteConnection(connection.connectionId);
});

test('getSyncUrl', async () => {
    const result = await syncConsumer.getSyncUrl(process.env.CHIFT_TEST_SYNC_ID as string);
    expect(result).toHaveProperty('url', expect.any(String));
});

test('getSyncData', async () => {
    const syncData = await syncConsumer.getSyncData(process.env.CHIFT_TEST_SYNC_ID as string);
    expect(syncData).toBeTruthy();
});

// TODO: data store tests
// test('getDataByDataStoreName', async () => {
//     const connections = await consumer.getDataByDataStoreName(dataStoreName, params);
//     expect(connections).toBeInstanceOf(Array);
// });

// test('getDataByDataStoreId', async () => {
//     const data = await consumer.getDataByDataStoreId(dataStoreId, params);
//     expect(data).toBeTruthy();
// });

// test('addDataByDataStoreId', async () => {
//     const response = await consumer.addDataByDataStoreId(dataStoreId, data);
//     expect(response).toBeTruthy();
// });

// test('addDataByDataStoreName', async () => {
//     const response = await consumer.addDataByDataStoreName(dataStoreName, data);
//     expect(response).toBeTruthy();
// });
