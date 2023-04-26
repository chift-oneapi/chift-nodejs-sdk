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
    size: 100,
};

// test('getAnalyticPlans', async () => {
//     const analyticPlans = await consumer.accounting.getAnalyticPlans(params);
//     expect(analyticPlans).toBeInstanceOf(Array);
// });

// test('getClients', async () => {
//     const clients = await consumer.accounting.getClients(params);
//     expect(clients).toBeInstanceOf(Array);
// });

// test('createClient', async () => {
//     const client = await consumer.accounting.createClient(params);
//     expect(client).toBeTruthy();
// });

// test('getClient', async () => {
//     const client = await consumer.accounting.getClient(params);
//     expect(client).toBeTruthy();
// });

// test('updateClient', async () => {
//     const updatedClient = await consumer.accounting.updateClient(params);
//     expect(updatedClient).toBeTruthy();
// });

// test('getSuppliers', async () => {
//     const suppliers = await consumer.accounting.getSuppliers(params);
//     expect(suppliers).toBeInstanceOf(Array);
// });

// test('createSupplier', async () => {
//     const supplier = await consumer.accounting.createSupplier(params);
//     expect(supplier).toBeTruthy();
// });

// test('getSupplier', async () => {
//     const supplier = await consumer.accounting.getSupplier(params);
//     expect(supplier).toBeTruthy();
// });

// test('updateSupplier', async () => {
//     const supplier = await consumer.accounting.updateSupplier(params);
//     expect(supplier).toBeTruthy();
// });

// test('createInvoice', async () => {
//     const invoice = await consumer.accounting.createInvoice(params);
//     expect(invoice).toBeTruthy();
// });

// test('createInvoiceWithMultiplePlans', async () => {
//     const invoice = await consumer.accounting.createInvoiceWithMultiplePlans(params);
//     expect(invoice).toBeTruthy();
// });

// test('getInvoicesByType', async () => {
//     const vatCodes = await consumer.accounting.getInvoicesByType(params);
//     expect(vatCodes).toBeInstanceOf(Array);
// });

// test('getInvoice', async () => {
//     const invoice = await consumer.accounting.getInvoice(params);
//     expect(invoice).toBeTruthy();
// });

// test('getInvoiceWithMultiplePlans', async () => {
//     const invoice = await consumer.accounting.getInvoiceWithMultiplePlans(params);
//     expect(invoice).toBeTruthy();
// });

// test('getInvoicesByTypeWithMultiplePlans', async () => {
//     const invoices = await consumer.accounting.getInvoicesByTypeWithMultiplePlans(params);
//     expect(invoices).toBeInstanceOf(Array);
// });

// test('createAnalyticAccount', async () => {
//     const analyticAccount = await consumer.accounting.createAnalyticAccount(params);
//     expect(analyticAccount).toBeTruthy();
// });

test('getAnalyticAccounts', async () => {
    const analyticAccounts = await consumer.accounting.getAnalyticAccounts(params);
    console.log('analyticAccounts', analyticAccounts);
    expect(analyticAccounts).toBeInstanceOf(Array);
});

// test('createAnalyticAccountWithMultiplePlans', async () => {
//     const analyticAccount = await consumer.accounting.createAnalyticAccountWithMultiplePlans(
//         params
//     );
//     expect(analyticAccount).toBeTruthy();
// });

// test('getAnalyticAccount', async () => {
//     const analyticAccount = await consumer.accounting.getAnalyticAccount(params);
//     expect(analyticAccount).toBeTruthy();
// });

// test('updateAnalyticAccount', async () => {
//     const analyticAccount = await consumer.accounting.updateAnalyticAccount(params);
//     expect(analyticAccount).toBeTruthy();
// });

// test('getAnalyticAccountWithMultiplePlans', async () => {
//     const analyticAccount = await consumer.accounting.getAnalyticAccountWithMultiplePlans(params);
//     expect(analyticAccount).toBeTruthy();
// });

// test('updateAnalyticAccountWithMultiplePlans', async () => {
//     const analyticAccount = await consumer.accounting.updateAnalyticAccountWithMultiplePlans(
//         params
//     );
//     expect(analyticAccount).toBeTruthy();
// });

// test('getAnalyticAccountsWithMultiplePlans', async () => {
//     const analyticAccounts = await consumer.accounting.getAnalyticAccountsWithMultiplePlans(params);
//     expect(analyticAccounts).toBeInstanceOf(Array);
// });

// test('getAnalyticLinesOfAccount', async () => {
//     const analyticLinesOfAccount = await consumer.accounting.getAnalyticLinesOfAccount(params);
//     expect(analyticLinesOfAccount).toBeTruthy();
// });
// test('getJournalEntries', async () => {
//     const journalEntries = await consumer.accounting.getJournalEntries(params);
//     expect(journalEntries).toBeInstanceOf(Array);
// });
// test('getJournalEntriesWithMultiplePlans', async () => {
//     const journalEntries = await consumer.accounting.getJournalEntriesWithMultiplePlans(params);
//     expect(journalEntries).toBeInstanceOf(Array);
// });
// test('getJournals', async () => {
//     const journals = await consumer.accounting.getJournals(params);
//     expect(journals).toBeInstanceOf(Array);
// });

// test('getVatCodes', async () => {
//     const vatCodes = await consumer.accounting.getVatCodes(params);
//     expect(vatCodes).toBeInstanceOf(Array);
// });

// test('getMiscOperations', async () => {
//     const miscOperations = await consumer.accounting.getMiscOperations(params);
//     expect(miscOperations).toBeInstanceOf(Array);
// });

// test('createMiscOperation', async () => {
//     const miscOperation = await consumer.accounting.createMiscOperation(params);
//     expect(miscOperation).toBeTruthy();
// });

// test('getMiscOperation', async () => {
//     const miscOperation = await consumer.accounting.getMiscOperation(params);
//     expect(miscOperation).toBeTruthy();
// });

// test('attachPDF', async () => {
//     const pdfOp = await consumer.accounting.attachPDF(params);
//     expect(pdfOp).toBeTruthy();
// });

// test('getChartOfAccounts', async () => {
//     const chartOfAccounts = await consumer.accounting.getChartOfAccounts(params);
//     expect(chartOfAccounts).toBeTruthy();
// });

// test('getBalanceOfAccounts', async () => {
//     const balanceOfAccounts = await consumer.accounting.getBalanceOfAccounts(params);
//     expect(balanceOfAccounts).toBeTruthy();
// });
