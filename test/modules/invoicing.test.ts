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

let invoices: any[];
test.only('getInvoicesByType', async () => {
    invoices = await consumer.invoicing.getInvoicesByType('customer_invoice', {
        date_from: '2021-01-01',
        date_to: '2021-12-31',
        ...params,
    });
    expect(invoices).toBeInstanceOf(Array);
    expect(invoices.length).toBeGreaterThan(0);
    expect(invoices[0]).toHaveProperty('id', expect.any(String));
    expect(invoices[0]).toHaveProperty('name', expect.any(String));
    expect(invoices[0]).toHaveProperty('code', expect.any(String));
});

test('getInvoiceById', async () => {
    const invoice = await consumer.invoicing.getInvoiceById(invoices[0].id, { include_pdf: false });
    expect(invoice).toHaveProperty('id', expect.any(String));
});

let products: any[];
test('getProducts', async () => {
    products = await consumer.invoicing.getProducts();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toHaveProperty('id', expect.any(String));
    expect(products[0]).toHaveProperty('is_prospect', true);
});

test('getProductById', async () => {
    const product = await consumer.invoicing.getProductById(products[0].id);
    expect(product).toHaveProperty('id', expect.any(String));
});

test('getVatCodes', async () => {
    const vatCodes = await consumer.invoicing.getVatCodes();
    expect(vatCodes).toBeInstanceOf(Array);
    expect(vatCodes.length).toBeGreaterThan(0);
    expect(vatCodes[0]).toHaveProperty('id', expect.any(String));
});

let opportunities: any[];
test('getOpportunities', async () => {
    opportunities = await consumer.invoicing.getOpportunities();
    expect(opportunities).toBeInstanceOf(Array);
    expect(opportunities.length).toBeGreaterThan(0);
    expect(opportunities[0]).toHaveProperty('id', expect.any(String));
});

test('getOpportunitiesById', async () => {
    const opportunity = await consumer.invoicing.getOpportunitiesById(opportunities[0].id);
    expect(opportunity).toHaveProperty('id', expect.any(String));
});

let contacts: any[];
test('getContacts', async () => {
    contacts = await consumer.invoicing.getContacts(params);
    expect(contacts).toBeInstanceOf(Array);
    expect(contacts.length).toBeGreaterThan(0);
    expect(contacts[0]).toHaveProperty('id', expect.any(String));
});

test('getContactById', async () => {
    const contact = await consumer.invoicing.getContactById(contacts[0].id);
    expect(contact).toHaveProperty('id', expect.any(String));
});
