import { beforeAll, expect, test } from '@jest/globals';
import * as chift from '../../src/index';
import * as dotenv from 'dotenv';
import { components } from '../../src/types/public-api/schema';
import fs from 'fs';
import { Consumer } from '../../src/modules/consumer';

dotenv.config();

const client = new chift.API({
    baseUrl: process.env.CHIFT_BACKBONE_API,
    clientId: process.env.CHIFT_TESTING_CLIENTID as string,
    clientSecret: process.env.CHIFT_TESTING_CLIENTSECRET as string,
    accountId: process.env.CHIFT_TESTING_ACCOUNTID as string,
});

const consumerId = process.env.CHIFT_ACCOUNTING_CONSUMER_ID as string;

let consumer: ReturnType<typeof Consumer>;
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

let vatCodes: components['schemas']['AccountingVatCode'][];
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
        is_company: true,
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
    if (!clients[0].id) throw new Error('Client ID is required');
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
    const client = clients.find((client) => client.external_reference === 'sdk test');
    if (!client?.id) throw new Error('Client id not found');
    const updatedClient = await consumer.accounting.updateClient(client.id, {
        website: 'https://test.com',
        is_company: true,
        active: true,
        addresses: [
            {
                address_type: 'main',
                street: 'Main Street',
                city: 'Brussels',
                postal_code: '1000',
                country: 'BE',
            },
        ],
    });
    expect(updatedClient).toBeTruthy();
    expect(updatedClient).toHaveProperty('website', 'https://test.com');
});

test('createSupplier', async () => {
    const body: components['schemas']['SupplierItemIn'] = {
        external_reference: 'sdk test',
        name: 'Jane Doe',
        currency: 'EUR',
        active: false,
        is_company: true,
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
    const supplier = await consumer.accounting.getSupplier(suppliers[0]?.id || '');
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
    const supplier = suppliers.find((supplier) => supplier.external_reference === 'sdk test');
    if (!supplier?.id) {
        throw new Error('Supplier not found');
    }
    const updatedSupplier = await consumer.accounting.updateSupplier(supplier.id, {
        name: 'Jane Updated Doe',
        is_company: true,
        active: true,
        addresses: [
            {
                address_type: 'main',
                street: 'Main Street',
                city: 'Brussels',
                postal_code: '1000',
                country: 'BE',
            },
        ],
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
    if (!vatCode?.id) {
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
        status: 'draft',
        currency_exchange_rate: 1,
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
                tax_code: vatCode.id,
                line_number: 1,
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
    if (!invoices?.[0].id) throw new Error('Invoice ID is required');
    const invoice = await consumer.accounting.getInvoice(invoices[0].id, {
        include_payments: 'true',
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

    const vatCode = vatCodes.find((vatCode) => vatCode.type === 'sale' && vatCode.rate === 21);
    if (!vatCode?.id) {
        throw new Error('No vat code with type "sale" and rate 21 found to create invoice');
    }

    const body: components['schemas']['InvoiceItemInMultiAnalyticPlans'] = {
        invoice_type: 'customer_invoice',
        invoice_date: '2022-12-01',
        due_date: '2022-12-31',
        currency: 'EUR',
        untaxed_amount: 100,
        tax_amount: 21,
        total: 121,
        partner_id: clients[0]?.id as string,
        journal_id: journal.id,
        status: 'draft',
        currency_exchange_rate: 1,
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
                tax_code: vatCode.id,
                line_number: 1,
                analytic_distribution: [],
            },
        ],
    };
    const invoice = await consumer.accounting.createInvoiceWithMultiplePlans(body);
    expect(invoice).toBeTruthy();
});

test('getInvoiceWithMultiplePlans', async () => {
    if (!invoices?.[0].id) throw new Error('Invoice ID is required');
    const invoice = await consumer.accounting.getInvoiceWithMultiplePlans(invoices[0].id, {
        include_payments: 'true',
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
    expect(analyticAccounts[0]).toHaveProperty('id', expect.any(String));
});

test.skip('createAnalyticAccountWithMultiplePlans', async () => {
    if (analyticPlans.length === 0) {
        throw new Error('No analytic plans found to create analytic account with multiple plans');
    }

    const analyticAccount = await consumer.accounting.createAnalyticAccountWithMultiplePlans(
        analyticPlans[0].id,
        {
            active: false,
            code: '4000',
            name: 'sdk test',
            currency: 'EUR',
        }
    );
    expect(analyticAccount).toBeTruthy();
});

test('getAnalyticAccount', async () => {
    if (analyticAccounts.length === 0) {
        throw new Error('No analytic accounts found to get analytic account');
    }

    const analyticAccount = await consumer.accounting.getAnalyticAccount(analyticAccounts[0].id);
    expect(analyticAccount).toBeTruthy();
});

test.skip('updateAnalyticAccount', async () => {
    if (analyticAccounts.length === 0) {
        throw new Error('No analytic accounts found to update analytic account');
    }

    const testAnalyticAccount = analyticAccounts.find((account) => account.name === 'sdk test');
    if (!testAnalyticAccount?.id) {
        throw new Error('No analytic account with name "sdk test" found to update');
    }
    const analyticAccount = await consumer.accounting.updateAnalyticAccount(
        testAnalyticAccount.id,
        { active: true, name: 'test sdk update' }
    );
    expect(analyticAccount).toBeTruthy();
    expect(analyticAccount).toHaveProperty('name', 'test sdk update');
});

test.skip('getAnalyticAccountWithMultiplePlans', async () => {
    if (analyticPlans.length === 0) {
        throw new Error('No analytic plans found to get analytic account with multiple plans');
    }

    const analyticAccount = await consumer.accounting.getAnalyticAccountWithMultiplePlans(
        analyticAccounts[0].id,
        analyticPlans[0].id
    );
    expect(analyticAccount).toBeTruthy();
});

test.skip('updateAnalyticAccountWithMultiplePlans', async () => {
    if (!analyticAccounts.length) {
        throw new Error(
            'No analytic accounts found to update analytic account with multiple plans'
        );
    }

    const testAnalyticAccount = analyticAccounts.find(
        (account) => account.name === 'test sdk update'
    );

    if (!testAnalyticAccount?.id) {
        throw new Error('No analytic account with name "test sdk update" found to update');
    }

    const analyticAccount = await consumer.accounting.updateAnalyticAccountWithMultiplePlans(
        testAnalyticAccount.id,
        '1',
        { name: 'test sdk update 2', active: true }
    );
    expect(analyticAccount).toBeTruthy();
    expect(analyticAccount).toHaveProperty('name', 'test sdk update 2');
});

test.skip('getAnalyticAccountsWithMultiplePlans', async () => {
    const analyticAccountsWithMultiplePlans =
        await consumer.accounting.getAnalyticAccountsWithMultiplePlans();
    expect(analyticAccountsWithMultiplePlans).toBeInstanceOf(Array);
});

test.skip('createJournalEntry', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'customer_invoice');
    if (!journal) {
        throw new Error('No journal with type "customer_invoice" found to create journal entry');
    }

    if (!clients.length) {
        throw new Error('No clients found to create journal entry');
    }

    if (!clients[0].id) {
        throw new Error('No client found to create journal entry');
    }

    const journalEntry = await consumer.accounting.createJournalEntry({
        journal_id: journal.id,
        number: new Date().valueOf().toString(),
        currency: 'EUR',
        date: '2022-01-01',
        currency_exchange_rate: 0,
        posted: false,
        items: [
            {
                account_type: 'customer_account',
                account: clients[0].id,
                credit: 0,
                debit: 10,
                prioritise_thirdparty_account: false,
                analytic_distribution: [],
            },
        ],
    });
    expect(journalEntry).toBeTruthy();
    expect(journalEntry).toHaveProperty('journal_id', journal.id);
});

let journalEntries: components['schemas']['JournalEntryMonoAnalyticPlan'][];
test('getJournalEntries', async () => {
    journalEntries = await consumer.accounting.getJournalEntries({
        unposted_allowed: 'true',
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test('getJournalEntriesWithMultiplePlans', async () => {
    const journalEntries = await consumer.accounting.getJournalEntriesWithMultiplePlans({
        unposted_allowed: 'true',
        date_from: '2022-01-01',
        date_to: '2022-01-31',
        journal_id: journals[0].id,
    });
    expect(journalEntries).toBeInstanceOf(Array);
});

test('getPaymentsByInvoiceId', async () => {
    if (!invoices?.[0].id) throw new Error('Invoice ID is required');
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
        currency_exchange_rate: 1,
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
    } as components['schemas']['MiscellaneousOperationIn'];

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
    if (!invoices?.[0].id) throw new Error('Invoice ID is required');
    await consumer.accounting.attachPDF(
        invoices[0].id,
        { base64_string: pdfData.toString('base64') },
        { overwrite_existing: 'true' }
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
    expect(balanceOfAccounts).toBeInstanceOf(Array);
});

test('getEmployees', async () => {
    const employees = await consumer.accounting.getEmployees();
    expect(employees).toBeTruthy();
});

test('getOutstandings', async () => {
    const outstandings = await consumer.accounting.getOutstandings({
        type: 'client',
        unposted_allowed: 'false',
    });
    expect(outstandings).toBeTruthy();
    expect(outstandings).toBeInstanceOf(Array);
});

test('createFinancialEntry', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'financial_operation');
    if (!journal) {
        throw new Error(
            'No journal with type "financial_operation" found to create financial entry'
        );
    }

    if (!clients?.[0]?.id) {
        throw new Error('No client ID found to create journal entry');
    }

    const financialEntry = await consumer.accounting.createFinancialEntry({
        date: '2022-01-01',
        journal_id: journal.id,
        currency: 'EUR',
        currency_exchange_rate: 1,
        items: [
            {
                account_type: 'customer_account',
                account: clients[0].id,
                amount: 10,
            },
        ],
    });
    expect(financialEntry).toBeTruthy();
    expect(financialEntry).toHaveProperty('journal_id', journal.id);
});

/**
 * @deprecated replaced by createFinancialEntry
 */
test('createFinancialEntryOld', async () => {
    const journal = journals.find((journal) => journal.journal_type === 'financial_operation');
    if (!journal) {
        throw new Error(
            'No journal with type "financial_operation" found to create financial entry'
        );
    }

    if (!clients?.[0]?.account_number) {
        throw new Error('[DEPRECATED] No client account_number found to create financial entry');
    }

    const financialEntry = await consumer.accounting.createFinancialEntryOld({
        date: '2022-01-01',
        journal_id: journal.id,
        currency: 'EUR',
        currency_exchange_rate: 1,
        items: [
            {
                account_type: 'customer_account',
                account: clients[0].account_number,
                amount: 10,
            },
        ],
    });
    expect(financialEntry).toBeTruthy();
    expect(financialEntry).toHaveProperty('journal_id', journal.id);
});

let folders: components['schemas']['FolderItem'][] = [];
test('getFolders', async () => {
    folders = await consumer.accounting.getFolders();
    expect(folders).toBeInstanceOf(Array);
    expect(folders.length).toBeGreaterThan(0);
    expect(folders[0]).toHaveProperty('id', expect.any(String));
    expect(folders[0]).toHaveProperty('name', expect.any(String));
});

test.skip('getAttachments', async () => {
    const attachments = await consumer.accounting.getAttachments({
        // TODO: Add documentId from test account
        document_id: '',
        type: 'invoice',
    });
    expect(attachments).toBeInstanceOf(Array);
    expect(attachments.length).toBeGreaterThan(0);
    expect(attachments[0]).toHaveProperty('id', expect.any(String));
    expect(attachments[0]).toHaveProperty('base64_string', expect.any(String));
});

test.skip('matchEntries', async () => {
    const match = await consumer.accounting.matchEntries({
        // TODO: Change params with test account values
        entries: [],
        partner_id: '',
    });
    expect(match).toHaveProperty('matching_number', expect.any(String));
    expect(match).toHaveProperty('balance', expect.any(Number));
});

test('getBookyears', async () => {
    const bookyears = await consumer.accounting.getBookyears();
    expect(bookyears).toBeInstanceOf(Array);
});

test('createLedgerAccount', async () => {
    const body: components['schemas']['LedgerAccountItemIn'] = {
        name: 'sdk test',
        number: '1324',
        type: 'other',
    };
    const ledgerAccount = await consumer.accounting.createLedgerAccount(body);
    expect(ledgerAccount).toBeTruthy();
    expect(ledgerAccount).toHaveProperty('name', 'sdk test');
});

test('getJournalEntry', async () => {
    if (!journalEntries?.[0].id) throw new Error('Journal entry ID is required');
    const journalEntry = await consumer.accounting.getJournalEntry(journalEntries[0].id);
    expect(journalEntry).toBeTruthy();
});
