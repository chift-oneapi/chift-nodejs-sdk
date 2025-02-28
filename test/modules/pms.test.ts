import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
import { Consumer } from '../../src/modules/consumer';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});
// TODO: Setup PMS test data
const consumerId = process.env.CHIFT_PMS_CONSUMER_ID as string;

let consumer: ReturnType<typeof Consumer>;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

test.skip('getLocations', async () => {
    const locations: components['schemas']['PMSLocationItem'][] = await consumer.pms.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getOrders', async () => {
    const orders: components['schemas']['PMSOrderItem'][] = await consumer.pms.getOrders({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getPaymentMethods', async () => {
    const paymentMethods: components['schemas']['PMSPaymentMethods'][] =
        await consumer.pms.getPaymentMethods();
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getClosure', async () => {
    const closure: components['schemas']['PMSClosureItem'] = await consumer.pms.getClosure(
        '2023-01-01'
    );
    expect(closure).toHaveProperty('id', expect.any(String));
});

test.skip('getPayments', async () => {
    const payments: components['schemas']['PMSPaymentItem'][] = await consumer.pms.getPayments({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBeGreaterThan(0);
    expect(payments[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getAccountingCategories', async () => {
    const accountingCategories: components['schemas']['PMSAccountingCategoryItem'][] =
        await consumer.pms.getAccountingCategories();
    expect(accountingCategories).toBeInstanceOf(Array);
    expect(accountingCategories.length).toBeGreaterThan(0);
    expect(accountingCategories[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getCustomers', async () => {
    const customers: components['schemas']['PMSCustomerItem'][] = await consumer.pms.getCustomers();
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
    expect(customers[0]).toHaveProperty('source_ref');
    expect(customers[0]).toHaveProperty('account_number');
});

test.skip('getInvoices', async () => {
    const invoices: components['schemas']['PMSInvoiceFullItem'][] = await consumer.pms.getInvoices({
        date_from: '2023-01-01',
        date_to: '2023-01-31',
    });
    expect(invoices).toBeInstanceOf(Array);
    expect(invoices.length).toBeGreaterThan(0);
    expect(invoices[0]).toHaveProperty('id', expect.any(String));
});
