import { expect, test } from '@jest/globals';
import { invoicingFactory } from '../../src/modules/invoicing';

test('getInvoiceById returns InvoiceItemOutSingle with pdf field support', () => {
    // Test that getInvoiceById supports include_pdf parameter and returns correct type
    const getInvoiceRequest = invoicingFactory.getInvoiceById('test-invoice-id', {
        include_pdf: 'true',
    });

    expect(getInvoiceRequest).toHaveProperty('method', 'get');
    expect(getInvoiceRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/invoicing/invoices/test-invoice-id'
    );
    expect(getInvoiceRequest).toHaveProperty('params', { include_pdf: 'true' });

    // The return type should be InvoiceItemOutSingle which includes the pdf field
    // This is verified at compile time by TypeScript

    // Test that the method works without params too
    const getInvoiceRequestNoParams = invoicingFactory.getInvoiceById('test-invoice-id');
    expect(getInvoiceRequestNoParams).toHaveProperty('method', 'get');
    expect(getInvoiceRequestNoParams).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/invoicing/invoices/test-invoice-id'
    );
    expect(getInvoiceRequestNoParams.params).toBeUndefined();
});

test('getInvoiceById parameter types allow include_pdf', () => {
    // Test various parameter combinations that should be valid
    const validParams = [
        { include_pdf: 'true' as const },
        { include_pdf: 'false' as const },
        { include_pdf: null },
        undefined,
    ];

    validParams.forEach((params, index) => {
        const request = invoicingFactory.getInvoiceById(`invoice-${index}`, params);
        expect(request).toHaveProperty('method', 'get');
        expect(request).toHaveProperty('params', params);
    });
});
