import { expect, test } from '@jest/globals';
import { invoicingFactory } from '../../src/modules/invoicing';

test('invoicing factory methods use correct HTTP methods', () => {
    // Test that createInvoice uses 'post' method
    const createInvoiceRequest = invoicingFactory.createInvoice({
        currency: 'EUR',
        invoice_type: 'customer_invoice',
        status: 'draft',
        invoice_date: '2023-01-01',
        tax_amount: 21,
        untaxed_amount: 100,
        total: 121,
        lines: [],
        due_date: '2023-01-31',
    });
    expect(createInvoiceRequest.method).toBe('post');
    expect(createInvoiceRequest.url).toBe('/consumers/{consumer_id}/invoicing/invoices');

    // Test that createProduct uses 'post' method
    const createProductRequest = invoicingFactory.createProduct({
        name: 'Test Product',
        unit_price: 10.99,
        currency: 'EUR',
    });
    expect(createProductRequest.method).toBe('post');
    expect(createProductRequest.url).toBe('/consumers/{consumer_id}/invoicing/products');

    // Test that createContact uses 'post' method
    const createContactRequest = invoicingFactory.createContact({
        is_company: false,
        first_name: 'Test',
        last_name: 'Contact',
        email: 'test@example.com',
        addresses: [],
    });
    expect(createContactRequest.method).toBe('post');
    expect(createContactRequest.url).toBe('/consumers/{consumer_id}/invoicing/contacts');
});

test('invoicing factory read methods use correct HTTP methods', () => {
    // Test that get methods use 'get' method
    const getInvoicesRequest = invoicingFactory.getInvoices();
    expect(getInvoicesRequest.method).toBe('get');
    expect(getInvoicesRequest.url).toBe('/consumers/{consumer_id}/invoicing/invoices');

    const getProductsRequest = invoicingFactory.getProducts();
    expect(getProductsRequest.method).toBe('get');
    expect(getProductsRequest.url).toBe('/consumers/{consumer_id}/invoicing/products');

    const getContactsRequest = invoicingFactory.getContacts();
    expect(getContactsRequest.method).toBe('get');
    expect(getContactsRequest.url).toBe('/consumers/{consumer_id}/invoicing/contacts');
});

test('invoicing factory methods have correct return types', () => {
    // Test that methods return RequestData objects with correct structure
    const getInvoicesRequest = invoicingFactory.getInvoices();
    expect(getInvoicesRequest).toHaveProperty('method');
    expect(getInvoicesRequest).toHaveProperty('url');

    const createInvoiceRequest = invoicingFactory.createInvoice({
        currency: 'EUR',
        invoice_type: 'customer_invoice',
        status: 'draft',
        invoice_date: '2023-01-01',
        tax_amount: 21,
        untaxed_amount: 100,
        total: 121,
        lines: [],
        due_date: '2023-01-31',
    });
    expect(createInvoiceRequest).toHaveProperty('method');
    expect(createInvoiceRequest).toHaveProperty('url');
    expect(createInvoiceRequest).toHaveProperty('body');
});
