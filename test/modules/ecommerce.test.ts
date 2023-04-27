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

const consumerId = process.env.CHIFT_CONSUMER_ID as string;

let consumer: any;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

const params = {
    page: 1,
    size: 2,
};

let customers: any[];
test('getAllCustomers', async () => {
    customers = await consumer.ecommerce.getAllCustomers(params);
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
});
