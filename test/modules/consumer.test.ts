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

let consumer: any;

beforeAll(async () => {
    consumer = await client.Consumers.createConsumer({
        email,
        redirect_url,
        name: consumerName,
    });
});

test('getConnections', async () => {
    const connections = await consumer.getConnections();
    expect(connections).toBeInstanceOf(Array);
});

test('createConnection', async () => {
    const connection = await consumer.createConnection(body);
    expect(connection).toBeTruthy();
});

test('updateConnection', async () => {
    const result = await consumer.updateConnection(connectionId, body);
    expect(result).toBeTruthy();
});

test('deleteConnection', async () => {
    const result = await consumer.deleteConnection(connectionId);
    expect(result).toBeTruthy();
});

test('getSyncUrl', async () => {
    const syncUrl = await consumer.getSyncUrl();
    expect(syncUrl).toBeTruthy();
});

test('getSyncData', async () => {
    const syncData = await consumer.getSyncData(syncId);
    expect(syncData).toBeTruthy();
});

test('getDataByDataStoreName', async () => {
    const connections = await consumer.getDataByDataStoreName(dataStoreName, params);
    expect(connections).toBeInstanceOf(Array);
});

test('getDataByDataStoreId', async () => {
    const data = await consumer.getDataByDataStoreId(dataStoreId, params);
    expect(data).toBeTruthy();
});

test('addDataByDataStoreId', async () => {
    const response = await consumer.addDataByDataStoreId(dataStoreId, data);
    expect(response).toBeTruthy();
});

test('addDataByDataStoreName', async () => {
    const response = await consumer.addDataByDataStoreName(dataStoreName, data);
    expect(response).toBeTruthy();
});

test('logData', async () => {
    const response = await consumer.logData(logs);
    expect(response).toBeTruthy();
});
