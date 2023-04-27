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

let analyticPlans: any[];
test('getAnalyticPlans', async () => {
    analyticPlans = await consumer.accounting.getAnalyticPlans(params);
    expect(analyticPlans).toBeInstanceOf(Array);
    expect(analyticPlans.length).toBeGreaterThan(0);
    expect(analyticPlans[0]).toHaveProperty('id', expect.any(String));
    expect(analyticPlans[0]).toHaveProperty('name', expect.any(String));
    expect(analyticPlans[0]).toHaveProperty('active', expect.any(Boolean));
});

let clients: any[];
test('getClients', async () => {
    clients = await consumer.accounting.getClients(params);
    expect(clients).toBeInstanceOf(Array);
    expect(clients.length).toBeGreaterThan(0);
    expect(clients[0]).toHaveProperty('id', expect.any(String));
});

test.skip('createClient', async () => {
    const client = await consumer.accounting.createClient(params);
    expect(client).toBeTruthy();
});

test('getClient', async () => {
    const client = await consumer.accounting.getClient(clients[0].id);
    expect(client).toBeTruthy();
    expect(client).toHaveProperty('external_reference');
    expect(client).toHaveProperty('first_name');
    expect(client).toHaveProperty('last_name');
    expect(client).toHaveProperty('name');
    expect(client).toHaveProperty('function');
    expect(client).toHaveProperty('is_company');
    expect(client).toHaveProperty('company_id');
    expect(client).toHaveProperty('phone');
    expect(client).toHaveProperty('mobile');
    expect(client).toHaveProperty('email');
    expect(client).toHaveProperty('language');
    expect(client).toHaveProperty('internal_notes');
    expect(client).toHaveProperty('website');
    expect(client).toHaveProperty('vat');
    expect(client).toHaveProperty('iban');
    expect(client).toHaveProperty('bank_account');
    expect(client).toHaveProperty('currency');
    expect(client).toHaveProperty('active', expect.any(Boolean));
    expect(client).toHaveProperty('addresses', expect.any(Array));
});

test.skip('updateClient', async () => {
    const updatedClient = await consumer.accounting.updateClient(params);
    expect(updatedClient).toBeTruthy();
});

let suppliers: any[];
test('getSuppliers', async () => {
    suppliers = await consumer.accounting.getSuppliers(params);
    expect(suppliers).toBeInstanceOf(Array);
    expect(suppliers.length).toBeGreaterThan(0);
});

test.skip('createSupplier', async () => {
    const supplier = await consumer.accounting.createSupplier(params);
    expect(supplier).toBeTruthy();
});

test('getSupplier', async () => {
    const supplier = await consumer.accounting.getSupplier(suppliers[0].id);
    expect(supplier).toBeTruthy();
    expect(supplier).toHaveProperty('external_reference');
    expect(supplier).toHaveProperty('first_name');
    expect(supplier).toHaveProperty('last_name');
    expect(supplier).toHaveProperty('name');
    expect(supplier).toHaveProperty('function');
    expect(supplier).toHaveProperty('is_company');
    expect(supplier).toHaveProperty('company_id');
    expect(supplier).toHaveProperty('phone');
    expect(supplier).toHaveProperty('mobile');
    expect(supplier).toHaveProperty('email');
    expect(supplier).toHaveProperty('language');
    expect(supplier).toHaveProperty('internal_notes');
    expect(supplier).toHaveProperty('website');
    expect(supplier).toHaveProperty('vat');
    expect(supplier).toHaveProperty('iban');
    expect(supplier).toHaveProperty('bank_account');
    expect(supplier).toHaveProperty('currency');
    expect(supplier).toHaveProperty('active', expect.any(Boolean));
    expect(supplier).toHaveProperty('addresses', expect.any(Array));
});

test.skip('updateSupplier', async () => {
    const supplier = await consumer.accounting.updateSupplier(params);
    expect(supplier).toBeTruthy();
});

test.skip('createInvoice', async () => {
    const invoice = await consumer.accounting.createInvoice(params);
    expect(invoice).toBeTruthy();
});

test.skip('createInvoiceWithMultiplePlans', async () => {
    const invoice = await consumer.accounting.createInvoiceWithMultiplePlans(params);
    expect(invoice).toBeTruthy();
});

let invoices: any[];
test('getInvoicesByType', async () => {
    invoices = await consumer.accounting.getInvoicesByType('customer_invoice', {
        ...params,
        date_from: '2022-12-01',
        date_to: '2022-12-31',
    });
    expect(invoices).toBeInstanceOf(Array);
    expect(invoices.length).toBeGreaterThan(0);
    expect(invoices[0]).toHaveProperty('id', expect.any(String));
});

test('getInvoicesByTypeWithMultiplePlans', async () => {
    const invoicesWithMultiplePlans = await consumer.accounting.getInvoicesByTypeWithMultiplePlans(
        'customer_invoice',
        {
            ...params,
            date_from: '2022-12-01',
            date_to: '2022-12-31',
        }
    );
    expect(invoicesWithMultiplePlans).toBeInstanceOf(Array);
    expect(invoicesWithMultiplePlans.length).toBeGreaterThan(0);
    expect(invoicesWithMultiplePlans[0]).toHaveProperty('id', expect.any(String));
});

test('getInvoice', async () => {
    const invoice = await consumer.accounting.getInvoice(invoices[0].id, {
        include_payments: true,
    });
    expect(invoice).toBeTruthy();
    expect(invoice).toHaveProperty('id', invoices[0].id);
    expect(invoices[0]).toHaveProperty('invoice_type', expect.any(String));
    expect(invoices[0]).toHaveProperty('invoice_number', expect.any(String));
    expect(invoices[0]).toHaveProperty('partner_id', expect.any(String));
    expect(invoices[0]).toHaveProperty('invoice_date', expect.any(String));
    expect(invoices[0]).toHaveProperty('due_date', expect.any(String));
    expect(invoices[0]).toHaveProperty('currency', expect.any(String));
    expect(invoices[0]).toHaveProperty('untaxed_amount', expect.any(Number));
    expect(invoices[0]).toHaveProperty('tax_amount', expect.any(Number));
    expect(invoices[0]).toHaveProperty('total', expect.any(Number));
    expect(invoices[0]).toHaveProperty('reference');
    expect(invoices[0]).toHaveProperty('payment_communication', expect.any(String));
    expect(invoices[0]).toHaveProperty('customer_memo');
    expect(invoices[0]).toHaveProperty('id', expect.any(String));
    expect(invoices[0]).toHaveProperty('journal_id', expect.any(String));
    expect(invoices[0]).toHaveProperty('payments');
    expect(invoices[0]).toHaveProperty('status', expect.any(String));
    expect(invoices[0]).toHaveProperty('lines');
});

test('getInvoiceWithMultiplePlans', async () => {
    const invoice = await consumer.accounting.getInvoiceWithMultiplePlans(invoices[0].id, {
        include_payments: true,
    });
    expect(invoice).toBeTruthy();
});

test.skip('createAnalyticAccount', async () => {
    const analyticAccount = await consumer.accounting.createAnalyticAccount(params);
    expect(analyticAccount).toBeTruthy();
});

let analyticAccounts: any[];
test('getAnalyticAccounts', async () => {
    analyticAccounts = await consumer.accounting.getAnalyticAccounts(params);
    expect(analyticAccounts).toBeInstanceOf(Array);
    expect(analyticAccounts.length).toBeGreaterThan(0);
    expect(analyticAccounts[0]).toHaveProperty('active', expect.any(Boolean));
    expect(analyticAccounts[0]).toHaveProperty('code', expect.any(String));
    expect(analyticAccounts[0]).toHaveProperty('name', expect.any(String));
    expect(analyticAccounts[0]).toHaveProperty('currency', expect.any(String));
    expect(analyticAccounts[0]).toHaveProperty('id', expect.any(String));
    expect(analyticAccounts[0]).toHaveProperty('balance', expect.any(Number));
    expect(analyticAccounts[0]).toHaveProperty('debit', expect.any(Number));
    expect(analyticAccounts[0]).toHaveProperty('credit', expect.any(Number));
});

test.skip('createAnalyticAccountWithMultiplePlans', async () => {
    const analyticAccount = await consumer.accounting.createAnalyticAccountWithMultiplePlans(
        params
    );
    expect(analyticAccount).toBeTruthy();
});

test('getAnalyticAccount', async () => {
    const analyticAccount = await consumer.accounting.getAnalyticAccount(analyticAccounts[0].id);
    expect(analyticAccount).toBeTruthy();
});

test.skip('updateAnalyticAccount', async () => {
    const analyticAccount = await consumer.accounting.updateAnalyticAccount(params);
    expect(analyticAccount).toBeTruthy();
});

// TODO: Fix error
test.skip('getAnalyticAccountWithMultiplePlans', async () => {
    console.log('analyticAccounts[0].id', analyticAccounts[0].id);
    console.log('analyticPlans[0].id', analyticPlans[0].id);
    const analyticAccount = await consumer.accounting.getAnalyticAccountWithMultiplePlans(
        analyticAccounts[0].id,
        analyticPlans[0].id
    );
    expect(analyticAccount).toBeTruthy();
});

test.skip('updateAnalyticAccountWithMultiplePlans', async () => {
    const analyticAccount = await consumer.accounting.updateAnalyticAccountWithMultiplePlans(
        params
    );
    expect(analyticAccount).toBeTruthy();
});

// TODO: Fix error
test.skip('getAnalyticAccountsWithMultiplePlans', async () => {
    const analyticAccountsWithMultiplePlans =
        await consumer.accounting.getAnalyticAccountsWithMultiplePlans();
    expect(analyticAccountsWithMultiplePlans).toBeInstanceOf(Array);
});

test('getAnalyticLinesOfAccount', async () => {
    const analyticLinesOfAccount = await consumer.accounting.getAnalyticLinesOfAccount(
        analyticAccounts[0].id
    );
    expect(analyticLinesOfAccount).toBeInstanceOf(Array);
    expect(analyticLinesOfAccount[0]).toHaveProperty('account_id', analyticAccounts[0].id);
    expect(analyticLinesOfAccount[0]).toHaveProperty('description', expect.any(String));
    expect(analyticLinesOfAccount[0]).toHaveProperty('amount', expect.any(Number));
    expect(analyticLinesOfAccount[0]).toHaveProperty('date', expect.any(String));
    expect(analyticLinesOfAccount[0]).toHaveProperty('id', expect.any(String));
});

let journals: any;
test('getJournals', async () => {
    journals = await consumer.accounting.getJournals(params);
    expect(journals).toBeInstanceOf(Array);
    expect(journals.length).toBeGreaterThan(0);
    expect(journals[0]).toHaveProperty('id', expect.any(String));
    expect(journals[0]).toHaveProperty('name', expect.any(String));
    expect(journals[0]).toHaveProperty('journal_type', expect.any(String));
});

test('getJournalEntries', async () => {
    const journalEntries = await consumer.accounting.getJournalEntries({
        ...params,
        unposted_allowed: true,
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test('getJournalEntriesWithMultiplePlans', async () => {
    const journalEntries = await consumer.accounting.getJournalEntriesWithMultiplePlans({
        ...params,
        unposted_allowed: true,
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test.skip('getPaymentsByInvoiceId', async () => {
    const payments = await consumer.accounting.getPaymentsByInvoiceId();
    expect(payments).toBeInstanceOf(Array);
});

test('getVatCodes', async () => {
    const vatCodes = await consumer.accounting.getVatCodes(params);
    console.log('getVatCodes', vatCodes);
    expect(vatCodes).toBeInstanceOf(Array);
    expect(vatCodes.length).toBeGreaterThan(0);
    expect(vatCodes[0]).toHaveProperty('id', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('code');
    expect(vatCodes[0]).toHaveProperty('label', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('scope', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('rate', expect.any(Number));
    expect(vatCodes[0]).toHaveProperty('type', expect.any(String));
});

let miscOperations: any[];
test('getMiscOperations', async () => {
    miscOperations = await consumer.accounting.getMiscOperations(params);
    expect(miscOperations).toBeInstanceOf(Array);
    expect(miscOperations.length).toBeGreaterThan(0);
    expect(miscOperations[0]).toHaveProperty('id', expect.any(String));
});

test.skip('createMiscOperation', async () => {
    const miscOperation = await consumer.accounting.createMiscOperation(params);
    expect(miscOperation).toBeTruthy();
});

test('getMiscOperation', async () => {
    const miscOperation = await consumer.accounting.getMiscOperation(miscOperations[0].id);
    expect(miscOperation).toBeTruthy();
    expect(miscOperation).toHaveProperty('operation_number', expect.any(String));
    expect(miscOperation).toHaveProperty('operation_date', expect.any(String));
    expect(miscOperation).toHaveProperty('currency', expect.any(String));
    expect(miscOperation).toHaveProperty('lines', expect.any(Array));
    expect(miscOperation).toHaveProperty('journal_id', expect.any(String));
    expect(miscOperation).toHaveProperty('status', expect.any(String));
    expect(miscOperation).toHaveProperty('id', expect.any(String));
});

test.skip('attachPDF', async () => {
    const pdfOp = await consumer.accounting.attachPDF(params);
    expect(pdfOp).toBeTruthy();
});

// TODO: fix error
test.skip('getChartOfAccounts', async () => {
    const chartOfAccounts = await consumer.accounting.getChartOfAccounts({
        ...params,
        classes: '6,7',
    });
    console.log('getChartOfAccounts', chartOfAccounts);
    expect(chartOfAccounts).toBeTruthy();
});

test('getBalanceOfAccounts', async () => {
    const balanceOfAccounts = await consumer.accounting.getBalanceOfAccounts(params, {
        accouts: ['7'],
        start: '2022-01-01',
        end: '2022-12-31',
    });
    expect(balanceOfAccounts).toBeTruthy();
    expect(balanceOfAccounts).toHaveProperty('items');
    expect(balanceOfAccounts.items).toBeInstanceOf(Array);
});
