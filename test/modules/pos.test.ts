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

// Split testing between two APIs to support all endpoints
const consumerId = process.env.CHIFT_POS_CONSUMER_ID as string;

let consumer: ReturnType<typeof Consumer>;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

test('getLocations', async () => {
    const locations = await consumer.pos.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
    expect(locations[0]).toHaveProperty('name', expect.any(String));
});

let orders: components['schemas']['POSOrderItem'][];
test.skip('getOrders', async () => {
    orders = await consumer.pos.getOrders({
        date_from: '2023-01-08',
        date_to: '2023-01-01',
    });
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0]).toHaveProperty('id', expect.any(String));
});

// TODO: Fix Method Not Allowed error
test.skip('createCustomer', async () => {
    const body = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'test@test.com',
    };
    const customer = await consumer.pos.createCustomer(body);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

// TODO: Fix timeout error
let customers: any[] = [];
test.skip('getCustomers', async () => {
    customers = await consumer.pos.getCustomers();
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

// TODO: Fix The day parameter is missing error
test.skip('getOrder', async () => {
    if (!orders.length) {
        throw new Error('No orders found to test getOrder');
    }

    const order = await consumer.pos.getOrder(orders[0].id);
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
    expect(order).toHaveProperty('order_number');
    expect(order).toHaveProperty('creation_date', expect.any(String));
    expect(order).toHaveProperty('closing_date');
    expect(order).toHaveProperty('service_date');
    expect(order).toHaveProperty('total', expect.any(Number));
    expect(order).toHaveProperty('tax_amount', expect.any(Number));
    expect(order).toHaveProperty('total_discount');
    expect(order).toHaveProperty('total_refund');
    expect(order).toHaveProperty('total_tip', expect.any(Number));
    expect(order).toHaveProperty('items', expect.any(Array));
    expect(order).toHaveProperty('payments', expect.any(Array));
    expect(order).toHaveProperty('currency');
    expect(order).toHaveProperty('country');
    expect(order).toHaveProperty('loyalty');
    expect(order).toHaveProperty('customer_id');
    expect(order).toHaveProperty('location_id');
    expect(order).toHaveProperty('taxes');
});

// TODO: Fix getCustomers first
test.skip('getCustomer', async () => {
    const customer = await consumer.pos.getCustomer(customers[0].id);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

test('getPaymentMethods', async () => {
    const paymentMethods = await consumer.pos.getPaymentMethods();
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('name', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('extra');
});

test('getSales', async () => {
    const sales = await consumer.pos.getSales({
        date_from: '2022-08-11',
        date_to: '2022-08-12',
    });
    expect(sales).toHaveProperty('total', expect.any(Number));
    expect(sales).toHaveProperty('tax_amount', expect.any(Number));
    expect(sales).toHaveProperty('taxes', expect.any(Array));
});

test('getClosure', async () => {
    const closure = await consumer.pos.getClosure('2022-08-11');
    expect(closure).toHaveProperty('date', expect.any(String));
    expect(closure).toHaveProperty('status');
});

test.skip('getPayments', async () => {
    const payments = await consumer.pos.getPayments({
        date_from: '2023-01-08',
        date_to: '2023-01-01',
    });
    expect(payments).toBeInstanceOf(Array);
    expect(payments.length).toBeGreaterThan(0);
    expect(payments[0]).toHaveProperty('id');
    expect(payments[0]).toHaveProperty('payment_method_id');
    expect(payments[0]).toHaveProperty('payment_method_name');
    expect(payments[0]).toHaveProperty('total', expect.any(Number));
    expect(payments[0]).toHaveProperty('tip', expect.any(Number));
    expect(payments[0]).toHaveProperty('status');
    expect(payments[0]).toHaveProperty('currency');
    expect(payments[0]).toHaveProperty('date');
});

// TODO: Fix API Resource does not exist
test.skip('updateOrder', async () => {
    const order = await consumer.pos.updateOrder(orders[0].id, {});
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
});

test.skip('getProducts', async () => {
    const products = await consumer.pos.getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
});

test('getProductCategories', async () => {
    const productCategories = await consumer.pos.getProductCategories();
    expect(productCategories).toBeInstanceOf(Array);
    expect(productCategories.length).toBeGreaterThan(0);
});

test('getAccountingCategories', async () => {
    const accountingCategories = await consumer.pos.getAccountingCategories();
    expect(accountingCategories).toBeInstanceOf(Array);
    expect(accountingCategories.length).toBeGreaterThan(0);
});
