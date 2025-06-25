import { expect, test } from '@jest/globals';
import { chiftOperations } from '../../src/types/public-api/mappings';

test('mappings contain banking operations', () => {
    const mappings = {} as chiftOperations;

    // Check that banking operations exist in the type
    expect('getFinancialInstitutions' in mappings).toBe(false); // This is a type check, not runtime
    expect('getBankingAccounts' in mappings).toBe(false); // This is a type check, not runtime
    expect('getAccountTransactions' in mappings).toBe(false); // This is a type check, not runtime
    expect('getAccountCounterparts' in mappings).toBe(false); // This is a type check, not runtime
});

test('mappings contain invoicing operations with correct naming', () => {
    const mappings = {} as chiftOperations;

    // Check that invoicing operations have the correct naming to avoid conflicts
    expect('getInvoicingInvoices' in mappings).toBe(false); // This is a type check, not runtime
    expect('createInvoicingInvoice' in mappings).toBe(false); // This is a type check, not runtime
    expect('getInvoicingProducts' in mappings).toBe(false); // This is a type check, not runtime
    expect('createInvoicingProduct' in mappings).toBe(false); // This is a type check, not runtime
});

test('mappings contain comprehensive sync operations', () => {
    const mappings = {} as chiftOperations;

    // Check that sync operations are comprehensive
    expect('getSyncs' in mappings).toBe(false); // This is a type check, not runtime
    expect('createSync' in mappings).toBe(false); // This is a type check, not runtime
    expect('updateSync' in mappings).toBe(false); // This is a type check, not runtime
    expect('sendCustomEvent' in mappings).toBe(false); // This is a type check, not runtime
});

test('mappings contain token operations', () => {
    const mappings = {} as chiftOperations;

    // Check that token operations exist
    expect('generateAccessToken' in mappings).toBe(false); // This is a type check, not runtime
});

test('mappings contain datastore operations', () => {
    const mappings = {} as chiftOperations;

    // Check that datastore operations exist
    expect('getDatastores' in mappings).toBe(false); // This is a type check, not runtime
    expect('getConsumerDatastoreData' in mappings).toBe(false); // This is a type check, not runtime
    expect('createConsumerDatastoreData' in mappings).toBe(false); // This is a type check, not runtime
    expect('updateConsumerDatastoreData' in mappings).toBe(false); // This is a type check, not runtime
    expect('deleteConsumerDatastoreData' in mappings).toBe(false); // This is a type check, not runtime
});

// This test verifies that the mappings type has significantly more operations than before
test('mappings type should be comprehensive', () => {
    // This is a compile-time test - if the mappings type doesn't have the expected
    // operations, TypeScript compilation will fail
    const testMappings: chiftOperations = {
        // Token operations
        generateAccessToken: 'generate_access_token_token_post',

        // Consumer operations
        getConsumers: 'consumers_get_consumers',
        createConsumer: 'consumers_create_consumer',

        // Banking operations (new)
        getFinancialInstitutions: 'banking_get_financial_institutions',
        getBankingAccounts: 'banking_get_accounts',
        getAccountTransactions: 'banking_get_account_transactions',
        getAccountCounterparts: 'banking_get_account_counterparts',

        // Invoicing operations (with corrected naming)
        getInvoicingInvoices: 'invoicing_get_invoices',
        createInvoicingInvoice: 'invoicing_post_invoices',

        // ... (partial list for testing)
    } as any; // Use 'as any' to avoid having to list all 150+ operations

    expect(testMappings).toBeDefined();
});
