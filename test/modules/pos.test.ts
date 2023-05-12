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

// Split testing between two APIs to support all endpoints
const cashpadConsumerId = process.env.CHIFT_CASHPAD_CONSUMER_ID as string;
const lightspeedConsumerId = process.env.CHIFT_LIGHTSPEED_CONSUMER_ID as string;

let cashpadConsumer: any;
let lightspeedConsumer: any;
beforeAll(async () => {
    cashpadConsumer = await client.Consumers.getConsumerById(cashpadConsumerId);
    lightspeedConsumer = await client.Consumers.getConsumerById(lightspeedConsumerId);
});

test('getLocations', async () => {
    const locations = await lightspeedConsumer.pos.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
    expect(locations[0]).toHaveProperty('name', expect.any(String));
});

let orders: any[];
test('getOrders', async () => {
    orders = await lightspeedConsumer.pos.getOrders({
        date_from: '2022-08-11',
        date_to: '2022-08-12',
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
    const customer = await cashpadConsumer.pos.createCustomer(body);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

// TODO: Fix timeout error
let customers: any[] = [];
test.skip('getCustomers', async () => {
    customers = await cashpadConsumer.pos.getCustomers();
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

// TODO: Fix The day parameter is missing error
test.skip('getOrder', async () => {
    const order = await lightspeedConsumer.pos.getOrder(orders[0].id);
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
    const customer = await cashpadConsumer.pos.getCustomer(customers[0].id);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

test('getPaymentMethods', async () => {
    const paymentMethods = await lightspeedConsumer.pos.getPaymentMethods();
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('name', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('extra');
});

test('getSales', async () => {
    const sales = await lightspeedConsumer.pos.getSales({
        date_from: '2022-08-11',
        date_to: '2022-08-12',
    });
    expect(sales).toHaveProperty('total', expect.any(Number));
    expect(sales).toHaveProperty('tax_amount', expect.any(Number));
    expect(sales).toHaveProperty('taxes', expect.any(Array));
});

test('getClosure', async () => {
    const closure = await lightspeedConsumer.pos.getClosure('2022-08-11');
    expect(closure).toHaveProperty('date', expect.any(String));
    expect(closure).toHaveProperty('status');
});

test('getPayments', async () => {
    const payments = await lightspeedConsumer.pos.getPayments({
        date_from: '2022-08-11',
        date_to: '2022-08-12',
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
    const order = await lightspeedConsumer.pos.updateOrder(orders[0].id, {});
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
});
