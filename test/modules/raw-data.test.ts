import { expect, test } from '@jest/globals';
import { accountingFactory } from '../../src/modules/accounting';
import { ecommerceFactory } from '../../src/modules/ecommerce';
import { bankingFactory } from '../../src/modules/banking';

test('accounting factory methods support rawData parameter', () => {
    // Test that getInvoicesByType supports rawData parameter
    const getInvoicesRequest = accountingFactory.getInvoicesByType(
        'customer_invoice',
        {},
        { rawData: true }
    );
    expect(getInvoicesRequest).toHaveProperty('rawData', true);
    expect(getInvoicesRequest).toHaveProperty('method', 'get');
    expect(getInvoicesRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/invoices/type/customer_invoice'
    );

    // Test that getInvoice supports rawData parameter
    const getInvoiceRequest = accountingFactory.getInvoice(
        'test-invoice-id',
        {},
        { rawData: true }
    );
    expect(getInvoiceRequest).toHaveProperty('rawData', true);
    expect(getInvoiceRequest).toHaveProperty('method', 'get');
    expect(getInvoiceRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/invoices/test-invoice-id'
    );
});

test('ecommerce factory methods support rawData parameter', () => {
    // Test that getOrders supports rawData parameter
    const getOrdersRequest = ecommerceFactory.getOrders({}, { rawData: true });
    expect(getOrdersRequest).toHaveProperty('rawData', true);
    expect(getOrdersRequest).toHaveProperty('method', 'get');
    expect(getOrdersRequest).toHaveProperty('url', '/consumers/{consumer_id}/commerce/orders');

    // Test that getOrder supports rawData parameter
    const getOrderRequest = ecommerceFactory.getOrder('test-order-id', {}, { rawData: true });
    expect(getOrderRequest).toHaveProperty('rawData', true);
    expect(getOrderRequest).toHaveProperty('method', 'get');
    expect(getOrderRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/commerce/orders/test-order-id'
    );
});

test('banking factory methods support rawData parameter', () => {
    // Test that getAccountTransactions supports rawData parameter
    const getTransactionsRequest = bankingFactory.getAccountTransactions(
        'test-account-id',
        {},
        { rawData: true }
    );
    expect(getTransactionsRequest).toHaveProperty('rawData', true);
    expect(getTransactionsRequest).toHaveProperty('method', 'get');
    expect(getTransactionsRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/banking/test-account-id/transactions'
    );
});

test('rawData parameter defaults to undefined when not specified', () => {
    // Test that rawData is undefined when not specified
    const getInvoicesRequest = accountingFactory.getInvoicesByType('customer_invoice');
    expect(getInvoicesRequest.rawData).toBeUndefined();

    const getOrdersRequest = ecommerceFactory.getOrders();
    expect(getOrdersRequest.rawData).toBeUndefined();

    const getTransactionsRequest = bankingFactory.getAccountTransactions('test-account-id');
    expect(getTransactionsRequest.rawData).toBeUndefined();
});

test('rawData parameter can be explicitly set to false', () => {
    // Test that rawData can be explicitly set to false
    const getInvoicesRequest = accountingFactory.getInvoicesByType(
        'customer_invoice',
        {},
        { rawData: false }
    );
    expect(getInvoicesRequest).toHaveProperty('rawData', false);

    const getOrdersRequest = ecommerceFactory.getOrders({}, { rawData: false });
    expect(getOrdersRequest).toHaveProperty('rawData', false);

    const getTransactionsRequest = bankingFactory.getAccountTransactions(
        'test-account-id',
        {},
        { rawData: false }
    );
    expect(getTransactionsRequest).toHaveProperty('rawData', false);
});
