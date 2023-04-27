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

test('getLocations', async () => {
    const locations = await consumer.pos.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
    expect(locations[0]).toHaveProperty('name', expect.any(String));
});

let orders: any[];
test('getOrders', async () => {
    orders = await consumer.pos.getOrders({
        ...params,
        date_from: '2021-01-01',
        date_to: '2021-01-31',
    });
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0]).toHaveProperty('id', expect.any(String));
    expect(orders[0]).toHaveProperty('name', expect.any(String));
});

let customers: any[];
test('getCustomers', async () => {
    customers = await consumer.pos.getCustomers({
        ...params,
    });
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

test('getCustomer', async () => {
    const customer = await consumer.pos.getCustomer(customers[0].id);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});
