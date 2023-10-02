import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
import fs from 'fs';

dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BASE_URL,
    clientId: process.env.CHIFT_CLIENT_ID as string,
    clientSecret: process.env.CHIFT_CLIENT_SECRET as string,
    accountId: process.env.CHIFT_ACCOUNT_ID as string,
});

const consumerId = process.env.CHIFT_ODOO_CONSUMER_ID as string;

let consumer: any;
beforeAll(async () => {
    consumer = await client.Consumers.getConsumerById(consumerId);
});

let analyticPlans: components['schemas']['AnalyticPlanItem'][];
test('getAnalyticPlans', async () => {
    analyticPlans = await consumer.accounting.getAnalyticPlans();
    expect(analyticPlans).toBeInstanceOf(Array);
    expect(analyticPlans.length).toBeGreaterThan(0);
    expect(analyticPlans[0]).toHaveProperty('id', expect.any(String));
    expect(analyticPlans[0]).toHaveProperty('name', expect.any(String));
    expect(analyticPlans[0]).toHaveProperty('active', expect.any(Boolean));
});

let journals: components['schemas']['Journal'][];
test('getJournals', async () => {
    journals = await consumer.accounting.getJournals();
    expect(journals).toBeInstanceOf(Array);
    expect(journals.length).toBeGreaterThan(0);
    expect(journals[0]).toHaveProperty('id', expect.any(String));
    expect(journals[0]).toHaveProperty('name', expect.any(String));
    expect(journals[0]).toHaveProperty('journal_type', expect.any(String));
});

let vatCodes: components['schemas']['app__routers__accounting__VatCode'][];
test('getVatCodes', async () => {
    vatCodes = await consumer.accounting.getVatCodes();
    expect(vatCodes).toBeInstanceOf(Array);
    expect(vatCodes.length).toBeGreaterThan(0);
    expect(vatCodes[0]).toHaveProperty('id', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('code');
    expect(vatCodes[0]).toHaveProperty('label', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('scope', expect.any(String));
    expect(vatCodes[0]).toHaveProperty('rate', expect.any(Number));
    expect(vatCodes[0]).toHaveProperty('type', expect.any(String));
});

test('createClient', async () => {
    const body: components['schemas']['ClientItemIn'] = {
        external_reference: 'sdk test',
        name: 'John Doe',
        currency: 'EUR',
        active: false,
        addresses: [
            {
                address_type: 'main',
                street: 'Main Street',
                city: 'Brussels',
                postal_code: '1000',
                country: 'BE',
            },
        ],
    };
    const client = await consumer.accounting.createClient(body);
    expect(client).toBeTruthy();
    expect(client).toHaveProperty('name', 'John Doe');
});

let clients: components['schemas']['ClientItemOut'][];
test('getClients', async () => {
    clients = await consumer.accounting.getClients();
    expect(clients).toBeInstanceOf(Array);
    expect(clients.length).toBeGreaterThan(0);
    expect(clients[0]).toHaveProperty('id', expect.any(String));
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

test('updateClient', async () => {
    const client = clients.find((client) => client.external_reference === 'sdk test');
    const updatedClient = await consumer.accounting.updateClient(client?.id, {
        name: 'John Updated Doe',
    });
    expect(updatedClient).toBeTruthy();
    expect(updatedClient).toHaveProperty('name', 'John Updated Doe');
});

test('createSupplier', async () => {
    const body: components['schemas']['SupplierItemIn'] = {
        external_reference: 'sdk test',
        name: 'Jane Doe',
        currency: 'EUR',
        active: false,
        addresses: [
            {
                address_type: 'main',
                street: 'Main Street',
                city: 'Brussels',
                postal_code: '1000',
                country: 'BE',
            },
        ],
    };
    const supplier = await consumer.accounting.createSupplier(body);
    expect(supplier).toBeTruthy();
    expect(supplier).toHaveProperty('name', 'Jane Doe');
});

let suppliers: components['schemas']['SupplierItemOut'][];
test('getSuppliers', async () => {
    suppliers = await consumer.accounting.getSuppliers();
    expect(suppliers).toBeInstanceOf(Array);
    expect(suppliers.length).toBeGreaterThan(0);
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

test('updateSupplier', async () => {
    const supplier = suppliers.find((supplier) => supplier.external_reference === 'sdk test');
    const updatedSupplier = await consumer.accounting.updateSupplier(supplier?.id, {
        name: 'Jane Updated Doe',
    });
    expect(updatedSupplier).toBeTruthy();
    expect(updatedSupplier).toHaveProperty('name', 'Jane Updated Doe');
});

test('createInvoice', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'customer_invoice');
    if (!journal) {
        throw new Error('No journal with type "customer_invoice" found to create invoice');
    }

    const vatCode = vatCodes.find((vatCode) => vatCode.type === 'sale' && vatCode.rate === 21);
    if (!vatCode?.code) {
        throw new Error('No vat code with type "sale" and rate 21 found to create invoice');
    }

    const body: components['schemas']['InvoiceItemInMonoAnalyticPlan'] = {
        invoice_type: 'customer_invoice',
        invoice_date: '2022-12-01',
        due_date: '2022-12-31',
        currency: 'EUR',
        untaxed_amount: 100,
        tax_amount: 21,
        total: 121,
        partner_id: clients[0]?.id as string,
        journal_id: journal.id,
        lines: [
            {
                description: 'Test',
                unit_price: 100,
                quantity: 1,
                untaxed_amount: 100,
                tax_rate: 21,
                tax_amount: 21,
                total: 121,
                account_number: '700000',
                tax_code: vatCode.code,
            },
        ],
    };
    const invoice = await consumer.accounting.createInvoice(body);
    expect(invoice).toBeTruthy();
    expect(invoice).toHaveProperty('total', 121);
});

let invoices: components['schemas']['InvoiceItemOutMonoAnalyticPlan'][];
test('getInvoicesByType', async () => {
    invoices = await consumer.accounting.getInvoicesByType('customer_invoice', {
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
    expect(invoices[0]).toHaveProperty('invoice_number');
    expect(invoices[0]).toHaveProperty('partner_id', expect.any(String));
    expect(invoices[0]).toHaveProperty('invoice_date', expect.any(String));
    expect(invoices[0]).toHaveProperty('due_date', expect.any(String));
    expect(invoices[0]).toHaveProperty('currency', expect.any(String));
    expect(invoices[0]).toHaveProperty('untaxed_amount', expect.any(Number));
    expect(invoices[0]).toHaveProperty('tax_amount', expect.any(Number));
    expect(invoices[0]).toHaveProperty('total', expect.any(Number));
    expect(invoices[0]).toHaveProperty('reference');
    expect(invoices[0]).toHaveProperty('payment_communication');
    expect(invoices[0]).toHaveProperty('customer_memo');
    expect(invoices[0]).toHaveProperty('id');
    expect(invoices[0]).toHaveProperty('journal_id', expect.any(String));
    expect(invoices[0]).toHaveProperty('payments');
    expect(invoices[0]).toHaveProperty('status');
    expect(invoices[0]).toHaveProperty('lines', expect.any(Array));
});

test('createInvoiceWithMultiplePlans', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'customer_invoice');
    if (!journal) {
        throw new Error(
            'No journal with type customer_invoice found to create Invoice With Multiple Plans'
        );
    }
    const body: components['schemas']['InvoiceItemInMonoAnalyticPlan'] = {
        invoice_type: 'customer_invoice',
        invoice_date: '2022-12-01',
        due_date: '2022-12-31',
        currency: 'EUR',
        untaxed_amount: 100,
        tax_amount: 21,
        total: 121,
        partner_id: clients[0]?.id as string,
        journal_id: journal.id,
        lines: [
            {
                description: 'Test',
                unit_price: 100,
                quantity: 1,
                untaxed_amount: 100,
                tax_rate: 21,
                tax_amount: 21,
                total: 121,
                account_number: '700000',
                tax_code: '1',
            },
        ],
    };
    const invoice = await consumer.accounting.createInvoiceWithMultiplePlans(body);
    expect(invoice).toBeTruthy();
});

test('getInvoiceWithMultiplePlans', async () => {
    const invoice = await consumer.accounting.getInvoiceWithMultiplePlans(invoices[0].id, {
        include_payments: true,
    });
    expect(invoice).toBeTruthy();
});

test('createAnalyticAccount', async () => {
    const body: components['schemas']['AnalyticAccountItemIn'] = {
        active: false,
        code: '4000',
        name: 'sdk test',
        currency: 'EUR',
    };
    const analyticAccount = await consumer.accounting.createAnalyticAccount(body);
    expect(analyticAccount).toBeTruthy();
    expect(analyticAccount).toHaveProperty('name', 'sdk test');
});

let analyticAccounts: components['schemas']['AnalyticAccountItemOut'][];
test('getAnalyticAccounts', async () => {
    analyticAccounts = await consumer.accounting.getAnalyticAccounts();
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

test('createAnalyticAccountWithMultiplePlans', async () => {
    const analyticAccount = await consumer.accounting.createAnalyticAccountWithMultiplePlans(
        analyticPlans[0].id,
        {
            code: '4000',
            name: 'sdk test',
            currency: 'EUR',
        }
    );
    expect(analyticAccount).toBeTruthy();
});

test('getAnalyticAccount', async () => {
    const analyticAccount = await consumer.accounting.getAnalyticAccount(analyticAccounts[0].id);
    expect(analyticAccount).toBeTruthy();
});

test('updateAnalyticAccount', async () => {
    const testAnalyticAccount = analyticAccounts.find((account) => account.name === 'sdk test');
    const analyticAccount = await consumer.accounting.updateAnalyticAccount(
        testAnalyticAccount?.id,
        { name: 'test sdk update' }
    );
    expect(analyticAccount).toBeTruthy();
    expect(analyticAccount).toHaveProperty('name', 'test sdk update');
});

test('getAnalyticAccountWithMultiplePlans', async () => {
    const analyticAccount = await consumer.accounting.getAnalyticAccountWithMultiplePlans(
        analyticAccounts[0].id,
        analyticPlans[0].id
    );
    expect(analyticAccount).toBeTruthy();
});

test('updateAnalyticAccountWithMultiplePlans', async () => {
    const testAnalyticAccount = analyticAccounts.find(
        (account) => account.name === 'test sdk update'
    );

    const analyticAccount = await consumer.accounting.updateAnalyticAccountWithMultiplePlans(
        testAnalyticAccount?.id,
        '1',
        { name: 'test sdk update 2' }
    );
    expect(analyticAccount).toBeTruthy();
    expect(analyticAccount).toHaveProperty('name', 'test sdk update 2');
});

test('getAnalyticAccountsWithMultiplePlans', async () => {
    const analyticAccountsWithMultiplePlans =
        await consumer.accounting.getAnalyticAccountsWithMultiplePlans();
    expect(analyticAccountsWithMultiplePlans).toBeInstanceOf(Array);
});

test('getAnalyticLinesOfAccount', async () => {
    const analyticLinesOfAccount = await consumer.accounting.getAnalyticLinesOfAccount(
        analyticAccounts[0].id
    );
    expect(analyticLinesOfAccount).toBeInstanceOf(Array);
    if (analyticLinesOfAccount.length > 0) {
        expect(analyticLinesOfAccount[0]).toHaveProperty('account_id', analyticAccounts[0].id);
        expect(analyticLinesOfAccount[0]).toHaveProperty('description', expect.any(String));
        expect(analyticLinesOfAccount[0]).toHaveProperty('amount', expect.any(Number));
        expect(analyticLinesOfAccount[0]).toHaveProperty('date', expect.any(String));
        expect(analyticLinesOfAccount[0]).toHaveProperty('id', expect.any(String));
    }
});

test('createJournalEntry', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'customer_invoice');
    if (!journal) {
        throw new Error('No journal with type "customer_invoice" found to create journal entry');
    }
    const journalEntry = await consumer.accounting.createJournalEntry({
        journal_id: journal.id,
        name: 'Journal test Chift SDK',
        date: '2022-01-01',
        items: [
            {
                account_number: clients[0].account_number,
                credit: 0,
                debit: 10,
                partner_id: clients[0].id,
            },
            {
                account_number: '700000',
                credit: 10,
                debit: 0,
            },
        ],
    });
    expect(journalEntry).toBeTruthy();
    expect(journalEntry).toHaveProperty('journal_id', journal.id);
});

test('getJournalEntries', async () => {
    const journalEntries = await consumer.accounting.getJournalEntries({
        unposted_allowed: true,
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test('getJournalEntriesWithMultiplePlans', async () => {
    const journalEntries = await consumer.accounting.getJournalEntriesWithMultiplePlans({
        unposted_allowed: true,
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test('getPaymentsByInvoiceId', async () => {
    const payments = await consumer.accounting.getPaymentsByInvoiceId(invoices[0].id);
    expect(payments).toBeInstanceOf(Array);
});

let miscOperations: components['schemas']['MiscellaneousOperationOut'][];
test('getMiscOperations', async () => {
    miscOperations = await consumer.accounting.getMiscOperations();
    expect(miscOperations).toBeInstanceOf(Array);
    expect(miscOperations.length).toBeGreaterThan(0);
    expect(miscOperations[0]).toHaveProperty('id', expect.any(String));
});

test('createMiscOperation', async () => {
    const data = {
        operation_date: '2023-04-29',
        currency: 'EUR',
        lines: [
            {
                line_number: 1,
                description: 'test line',
                amount: 0,
                type: 'general_account',
                account_number: '400000',
            },
        ],
        journal_id: journals?.find(
            (journal: components['schemas']['Journal']) =>
                journal.journal_type === 'miscellaneous_operation'
        )?.id,
        status: 'draft',
    };

    const miscOperation = await consumer.accounting.createMiscOperation(data);
    expect(miscOperation).toBeTruthy();
});

test('getMiscOperation', async () => {
    const miscOperation = await consumer.accounting.getMiscOperation(miscOperations[0].id);
    expect(miscOperation).toBeTruthy();
    expect(miscOperation).toHaveProperty('operation_number');
    expect(miscOperation).toHaveProperty('operation_date', expect.any(String));
    expect(miscOperation).toHaveProperty('currency', expect.any(String));
    expect(miscOperation).toHaveProperty('lines', expect.any(Array));
    expect(miscOperation).toHaveProperty('journal_id', expect.any(String));
    expect(miscOperation).toHaveProperty('status', expect.any(String));
    expect(miscOperation).toHaveProperty('id', expect.any(String));
});

test('attachPDF', async () => {
    const pdfData = fs.readFileSync('test/data/accounting_invoice.pdf');
    await consumer.accounting.attachPDF(
        invoices[0].id,
        { base64_string: pdfData.toString('base64') },
        { overwrite_existing: true }
    );
});

test('getChartOfAccounts', async () => {
    const chartOfAccounts = await consumer.accounting.getChartOfAccounts({
        classes: '6,7',
    });
    expect(chartOfAccounts).toBeTruthy();
});

test('getBalanceOfAccounts', async () => {
    const balanceOfAccounts = await consumer.accounting.getBalanceOfAccounts({
        accounts: ['7'],
        start: '2022-01-01',
        end: '2022-12-31',
    });
    expect(balanceOfAccounts).toBeTruthy();
    expect(balanceOfAccounts).toHaveProperty('items');
    expect(balanceOfAccounts.items).toBeInstanceOf(Array);
});

test('getEmployees', async () => {
    const employees = await consumer.accounting.getEmployees();
    expect(employees).toBeTruthy();
    expect(employees.items).toBeInstanceOf(Array);
});

test('getOutstandings', async () => {
    const outstandings = await consumer.accounting.getOutstandings({
        type: 'client',
        unposted_allowed: true,
    });
    expect(outstandings).toBeTruthy();
    expect(outstandings.items).toBeInstanceOf(Array);
});

test('createFinancialEntry', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'financial_operation');
    if (!journal) {
        throw new Error(
            'No journal with type "financial_operation" found to create financial entry'
        );
    }

    const financialEntry = await consumer.accounting.createFinancialEntry({
        date: '2022-01-01',
        journal_id: journal.id,
        currency: 'EUR',
        items: [
            {
                type: 'customer_account',
                account_number: clients[0].account_number,
                partner_id: clients[0].id,
                amount: 10,
            },
        ],
    });
    expect(financialEntry).toBeTruthy();
    expect(financialEntry).toHaveProperty('journal_id', journal.id);
});
