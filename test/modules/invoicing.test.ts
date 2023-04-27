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

let products: any[];
test('getOrders', async () => {
    products = await consumer.invoicing.getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id', expect.any(String));
    expect(products[0]).toHaveProperty('name', expect.any(String));
    expect(products[0]).toHaveProperty('code', expect.any(String));
});

let contacts: any[];
test('getContacts', async () => {
    contacts = await consumer.invoicing.getContacts({ ...params, is_prospect: true });
    expect(contacts).toBeInstanceOf(Array);
    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts[0]).toHaveProperty('id', expect.any(String));
    expect(contacts[0]).toHaveProperty('is_prospect', true);
});
