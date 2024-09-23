import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

const consumerId = process.env.CHIFT_ECOMMERCE_CONSUMER_ID as string;

let consumer: any;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

let customers: components['schemas']['CommerceCustomerItem'][];
test('getCustomers', async () => {
    customers = await consumer.ecommerce.getCustomers();
    expect(customers).toBeInstanceOf(Array);
    expect(customers.length).toBeGreaterThan(0);
    expect(customers[0]).toHaveProperty('id', expect.any(String));
});

let products: components['schemas']['backbone_api__app__routers__commerce__ProductItem'][];
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

let productVariant: components['schemas']['VariantItem'];
test.skip('getProductVariantById', async () => {
    if (!products?.length) {
        throw new Error('No product to test');
    }

    if (!products[0].variants.length) {
        throw new Error('No product variant to test');
    }

    productVariant = await consumer.ecommerce.getProductVariantById(products[0].variants[0].id);
    expect(productVariant).toBeTruthy();
    expect(productVariant).toHaveProperty('id', expect.any(String));
});

let locations: components['schemas']['CommerceLocationItem'][];
test('getLocations', async () => {
    locations = await consumer.ecommerce.getLocations();
    expect(locations).toBeInstanceOf(Array);
    expect(locations.length).toBeGreaterThan(0);
    expect(locations[0]).toHaveProperty('id', expect.any(String));
    expect(locations[0]).toHaveProperty('name', expect.any(String));
});

test.skip('updateAvailableQuantity', async () => {
    if (!productVariant) {
        throw new Error('No product variant found to update available quantity');
    }

    if (!locations?.length) {
        throw new Error('No location found to update available quantity');
    }

    const product = await consumer.ecommerce.updateAvailableQuantity(productVariant.id, {
        location_id: locations[0].id,
        available_quantity: 1,
    });
    expect(product).toBeTruthy();
    expect(product).toHaveProperty('available_quantity', expect.any(Number));
});

// TODO: Fix create order test
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

let orders: components['schemas']['OrderItemOut'][];
test('getOrders', async () => {
    orders = await consumer.ecommerce.getOrders({
        date_from: '2023-01-08',
        date_to: '2023-01-01',
    });
    expect(orders).toBeInstanceOf(Array);
});

test.skip('getOrder', async () => {
    if (!orders?.length) {
        throw new Error('No orders found to test getOrder');
    }

    const order = await consumer.ecommerce.getOrder(orders[0].id);
    expect(order).toBeTruthy();
    expect(order).toHaveProperty('id', expect.any(String));
    expect(order).toHaveProperty('order_number');
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

test('getPaymentMethods', async () => {
    const paymentMethods = await consumer.ecommerce.getPaymentMethods();
    expect(paymentMethods).toBeInstanceOf(Array);
    expect(paymentMethods.length).toBeGreaterThan(0);
    expect(paymentMethods[0]).toHaveProperty('id', expect.any(String));
    expect(paymentMethods[0]).toHaveProperty('name', expect.any(String));
});

test('getProductCategories', async () => {
    const productCategories = await consumer.ecommerce.getProductCategories();
    expect(productCategories).toBeInstanceOf(Array);
    expect(productCategories.length).toBeGreaterThan(0);
    expect(productCategories[0]).toHaveProperty('id', expect.any(String));
    expect(productCategories[0]).toHaveProperty('name', expect.any(String));
});

test('getCountries', async () => {
    const countries = await consumer.ecommerce.getCountries();
    expect(countries).toBeInstanceOf(Array);
    expect(countries.length).toBeGreaterThan(0);
    expect(countries[0]).toHaveProperty('code', expect.any(String));
    expect(countries[0]).toHaveProperty('name', expect.any(String));
});

test('getTaxes', async () => {
    const taxes = await consumer.ecommerce.getTaxes();
    expect(taxes).toBeInstanceOf(Array);
    expect(taxes.length).toBeGreaterThan(0);
    expect(taxes[0]).toHaveProperty('id', expect.any(String));
    expect(taxes[0]).toHaveProperty('rate', expect.any(Number));
});
