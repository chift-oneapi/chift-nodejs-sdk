import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Consumer } from '../../src/modules/consumer';

dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

const consumerName = 'test consumer';
const email = 'support@chift.eu';
const redirect_url = 'https://chift.eu';

let consumer: ReturnType<typeof Consumer>;

beforeAll(async () => {
    consumer = await client.Consumers.createConsumer({
        email,
        redirect_url,
        name: consumerName,
    });
});

test('createConsumer', async () => {
    expect(consumer).toHaveProperty('consumerId');
    expect(consumer).toHaveProperty('getConnections');
    expect(consumer).toHaveProperty('createConnection');
    expect(consumer).toHaveProperty('updateConnection');
    expect(consumer).toHaveProperty('deleteConnection');
    expect(consumer).toHaveProperty('getSyncUrl');
    expect(consumer).toHaveProperty('name', consumerName);
    expect(consumer).toHaveProperty('redirect_url', redirect_url);
    expect(consumer).toHaveProperty('email', email);
    expect(consumer).toHaveProperty('pos');
    expect(consumer).toHaveProperty('accounting');
    expect(consumer).toHaveProperty('invoicing');
    expect(consumer).toHaveProperty('ecommerce');
    expect(consumer).toHaveProperty('custom');
});

test('getConsumers', async () => {
    const consumers = await client.Consumers.getConsumers();
    expect(consumers).toBeInstanceOf(Array);
});

test('getConsumersByName', async () => {
    const consumersWithName = await client.Consumers.getConsumersByName(consumerName);
    expect(consumersWithName).toBeInstanceOf(Array);
    expect(consumersWithName.some((consumer: any) => consumer.name.includes(consumerName))).toBe(
        true
    );
});

test('getConsumerById', async () => {
    const consumerWithId = await client.Consumers.getConsumerById(consumer.consumerId);
    expect(consumerWithId).toHaveProperty('consumerId', consumer.consumerId);
});

test('updateConsumerById', async () => {
    const updatedName = 'updated test consumer';
    const updatedConsumer = await client.Consumers.updateConsumerById(consumer.consumerId, {
        name: updatedName,
    });
    expect(updatedConsumer).toHaveProperty('name', updatedName);
});

test('deleteConsumerById', async () => {
    expect.assertions(1);
    try {
        await client.Consumers.deleteConsumerById(consumer.consumerId);
        await client.Consumers.getConsumerById(consumer.consumerId);
    } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
            expect(e.message).toMatch('Request failed with status code 404');
            return;
        }

        throw e;
    }
});
