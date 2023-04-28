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

// TODO: params does not seem to work
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
        date_from: '2022-05-01',
        date_to: '2022-07-30',
    });
    expect(orders).toBeInstanceOf(Array);
    expect(orders.length).toBeGreaterThan(0);
    expect(orders[0]).toHaveProperty('id', expect.any(String));
});

let customers: any[];
// TODO: not supported against tested API
test.skip('getCustomers', async () => {
    customers = await consumer.pos.getCustomers({
        ...params,
    });
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

test.skip('getOrder', async () => {
    // TODO: Fix return order items only
    const order = await consumer.pos.getOrder(orders[0].id);
    console.log('order', order);
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
// TODO: not supported against tested API
test.skip('getCustomer', async () => {
    const customer = await consumer.pos.getCustomer(customers[0].id);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

test.skip('createCustomer', async () => {
    const customer = await consumer.pos.createCustomer();
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty('id', expect.any(String));
    expect(customer).toHaveProperty('name');
});

test('getPaymentMethods', async () => {
    const paymentMethods = await consumer.pos.getPaymentMethods(params);
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('name', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('extra');
});

test('getSales', async () => {
    const sales = await consumer.pos.getSales({ date_from: '2021-01-01', date_to: '2021-01-31' });
    expect(sales).toHaveProperty('total', expect.any(Number));
    expect(sales).toHaveProperty('tax_amount', expect.any(Number));
    expect(sales).toHaveProperty('taxes', expect.any(Array));
});

// TODO: params do not match API specs
test.skip('getClosure', async () => {
    const closure = await consumer.pos.getClosure();
    expect(closure).toBeTruthy();
    expect(closure).toHaveProperty('id', expect.any(String));
});

test('getPayments', async () => {
    const payments = await consumer.pos.getPayments({
        ...params,
        date_from: '2022-07-01',
        date_to: '2022-12-31',
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

// TODO:
test.skip('updateOrder', async () => {
    const order = await consumer.pos.updateOrder(orders[0].id, {
        customer_id: customers[0].id,
    });
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
    expect(order).toHaveProperty('customer_id', customers[0].id);
});
