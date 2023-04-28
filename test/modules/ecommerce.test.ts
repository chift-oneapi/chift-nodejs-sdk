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

let customers: any[];
test('getCustomers', async () => {
    customers = await consumer.ecommerce.getCustomers(params);
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

let products: any[];
test('getProducts', async () => {
    products = await consumer.ecommerce.getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id', expect.any(String));
});

test('getCustomer', async () => {
    const customer = await consumer.ecommerce.getCustomer(customers[0].id);
    expect(customer).toHaveProperty('id', customers[0].id);
    expect(customer).toHaveProperty('first_name');
    expect(customer).toHaveProperty('last_name');
    expect(customer).toHaveProperty('phone');
    expect(customer).toHaveProperty('email');
    expect(customer).toHaveProperty('language');
    expect(customer).toHaveProperty('internal_notes');
    expect(customer).toHaveProperty('currency');
    expect(customer).toHaveProperty('addresses');
    expect(customer).toHaveProperty('created_on');
});

test('getProduct', async () => {
    const product = await consumer.ecommerce.getProduct(products[0].id);
    expect(product).toBeTruthy();
    expect(product).toHaveProperty('id', products[0].id);
    expect(product).toHaveProperty('name', expect.any(String));
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('description_html');
    expect(product).toHaveProperty('categories');
    expect(product).toHaveProperty('created_on');
    expect(product).toHaveProperty('variants');
    expect(product).toHaveProperty('status');
    expect(product).toHaveProperty('common_attributes');
    expect(product).toHaveProperty('variant_attributes_options');
    expect(product).toHaveProperty('common_images');
});

test('getProductVariantById', async () => {
    const variant = await consumer.ecommerce.getProductVariantById(products[0].variants[0].id);
    expect(variant).toBeTruthy();
    expect(variant).toHaveProperty('id', expect.any(String));
});

// TODO:
test.skip('updateAvailableQuantity', async () => {
    const product = await consumer.ecommerce.updateAvailableQuantity(products[0].variants[0].id);
    expect(product).toBeTruthy();
    expect(product).toHaveProperty('id', expect.any(String));
});

test('getLocations', async () => {
    const locations = await consumer.ecommerce.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
    expect(locations[0]).toHaveProperty('name', expect.any(String));
});

test.skip('createOrder', async () => {
    const order = await consumer.ecommerce.createOrder({
        customer: {
            email: 'test@test.com',
        },
        billing_address: {
            first_name: 'Test',
            last_name: 'Test',
            street: 'Test',
            number: '1',
            city: 'Test',
            country: 'BE',
        },
        shipping_address: {
            first_name: 'Test',
            last_name: 'Test',
            street: 'Test',
            number: '1',
            city: 'Test',
            country: 'BE',
        },
        currency: 'EUR',
        lines: [
            {
                variant_id: '1',
                quantity: 1,
                tax_rate: 21.0,
                unit_price: 10.0,
            },
        ],
        payment_method: 'bank-transfer',
    });
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
});

let orders: any[];
test('getOrders', async () => {
    orders = await consumer.ecommerce.getOrders({
        ...params,
        date_from: '2021-10-01',
        date_to: '2021-12-31',
    });
    expect(orders).toBeInstanceOf(Array);
});

test('getOrder', async () => {
    const order = await consumer.ecommerce.getOrder(orders[0].id);
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
    expect(order).toHaveProperty('order_number');
    expect(order).toHaveProperty('customer_id');
    expect(order).toHaveProperty('billing_address');
    expect(order).toHaveProperty('shipping_address');
    expect(order).toHaveProperty('created_on');
    expect(order).toHaveProperty('confirmed_on');
    expect(order).toHaveProperty('cancelled_on');
    expect(order).toHaveProperty('status', expect.any(String));
    expect(order).toHaveProperty('discount_amount', expect.any(Number));
    expect(order).toHaveProperty('untaxed_amount_without_fees', expect.any(Number));
    expect(order).toHaveProperty('tax_amount_without_fees', expect.any(Number));
    expect(order).toHaveProperty('total_without_fees', expect.any(Number));
    expect(order).toHaveProperty('untaxed_amount', expect.any(Number));
    expect(order).toHaveProperty('tax_amount', expect.any(Number));
    expect(order).toHaveProperty('total', expect.any(Number));
    expect(order).toHaveProperty('refunded_amount', expect.any(Number));
    expect(order).toHaveProperty('currency');
    expect(order).toHaveProperty('note');
    expect(order).toHaveProperty('lines', expect.any(Array));
    expect(order).toHaveProperty('other_fees');
});
