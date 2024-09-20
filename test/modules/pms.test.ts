import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BASE_URL,
    clientId: process.env.CHIFT_CLIENT_ID as string,
    clientSecret: process.env.CHIFT_CLIENT_SECRET as string,
    accountId: process.env.CHIFT_ACCOUNT_ID as string,
});
// TODO: Setup PMS test data
const consumerId = process.env.CHIFT_PLANITY_CONSUMER_ID as string;

let consumer: any;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

test('getLocations', async () => {
    const locations: components['schemas']['PMSLocationItem'][] = await consumer.pms.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
});

test('getOrders', async () => {
    const orders: components['schemas']['PMSOrderItem'][] = await consumer.pms.getOrders({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0]).toHaveProperty('id', expect.any(String));
});

test('getPaymentMethods', async () => {
    const paymentMethods: components['schemas']['PMSPaymentMethods'][] =
        await consumer.pms.getPaymentMethods();
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
});

test('getClosure', async () => {
    const closure: components['schemas']['PMSClosureItem'] = await consumer.pms.getClosure(
        '2023-01-01'
    );
    expect(closure).toHaveProperty('id', expect.any(String));
});

test('getPayments', async () => {
    const payments: components['schemas']['PMSPaymentItem'][] = await consumer.pms.getPayments({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBeGreaterThan(0);
    expect(payments[0]).toHaveProperty('id', expect.any(String));
});

test('getAccountingCategories', async () => {
    const accountingCategories: components['schemas']['PMSAccountingCategoryItem'][] =
        await consumer.pms.getAccountingCategories();
    expect(accountingCategories).toBeInstanceOf(Array);
    expect(accountingCategories.length).toBeGreaterThan(0);
    expect(accountingCategories[0]).toHaveProperty('id', expect.any(String));
});
