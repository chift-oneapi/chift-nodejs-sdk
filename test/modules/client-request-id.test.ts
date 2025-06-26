import { expect, test } from '@jest/globals';
import { accountingFactory } from '../../src/modules/accounting';
import { ecommerceFactory } from '../../src/modules/ecommerce';
import { invoicingFactory } from '../../src/modules/invoicing';
import { posFactory } from '../../src/modules/pos';
import { customFactory } from '../../src/modules/custom';

test('accounting factory methods support clientRequestId parameter for create operations', () => {
    // Test that createClient supports clientRequestId parameter
    const createClientRequest = accountingFactory.createClient(
        { name: 'Test Client' } as any,
        undefined,
        'test-request-id-123'
    );
    expect(createClientRequest).toHaveProperty('clientRequestId', 'test-request-id-123');
    expect(createClientRequest).toHaveProperty('method', 'post');
    expect(createClientRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/clients'
    );
    expect(createClientRequest).toHaveProperty('body', { name: 'Test Client' });

    // Test that createInvoice supports clientRequestId parameter
    const createInvoiceRequest = accountingFactory.createInvoice(
        { number: 'INV-001' } as any,
        undefined,
        'test-invoice-request-id-789'
    );
    expect(createInvoiceRequest).toHaveProperty('clientRequestId', 'test-invoice-request-id-789');
    expect(createInvoiceRequest).toHaveProperty('method', 'post');
    expect(createInvoiceRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/invoices'
    );

    // Test that createSupplier supports clientRequestId parameter
    const createSupplierRequest = accountingFactory.createSupplier(
        { name: 'Test Supplier' } as any,
        undefined,
        'test-supplier-request-id-456'
    );
    expect(createSupplierRequest).toHaveProperty('clientRequestId', 'test-supplier-request-id-456');
    expect(createSupplierRequest).toHaveProperty('method', 'post');
    expect(createSupplierRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/suppliers'
    );
});

test('accounting factory methods support clientRequestId parameter for update operations', () => {
    // Test that updateClient supports clientRequestId parameter
    const updateClientRequest = accountingFactory.updateClient(
        'client-123',
        { name: 'Updated Client' } as any,
        undefined,
        'test-update-request-id-456'
    );
    expect(updateClientRequest).toHaveProperty('clientRequestId', 'test-update-request-id-456');
    expect(updateClientRequest).toHaveProperty('method', 'patch');
    expect(updateClientRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/accounting/clients/client-123'
    );
    expect(updateClientRequest).toHaveProperty('body', { name: 'Updated Client' });
});

test('ecommerce factory methods support clientRequestId parameter', () => {
    // Test that createOrder supports clientRequestId parameter
    const createOrderRequest = ecommerceFactory.createOrder(
        { customer_id: 'cust-123' } as any,
        'test-ecommerce-order-id-123'
    );
    expect(createOrderRequest).toHaveProperty('clientRequestId', 'test-ecommerce-order-id-123');
    expect(createOrderRequest).toHaveProperty('method', 'post');
    expect(createOrderRequest).toHaveProperty('url', '/consumers/{consumer_id}/commerce/orders');
    expect(createOrderRequest).toHaveProperty('body', { customer_id: 'cust-123' });

    // Test that updateAvailableQuantity supports clientRequestId parameter
    const updateQuantityRequest = ecommerceFactory.updateAvailableQuantity(
        'variant-123',
        { quantity: 10 } as any,
        'test-quantity-update-id-456'
    );
    expect(updateQuantityRequest).toHaveProperty('clientRequestId', 'test-quantity-update-id-456');
    expect(updateQuantityRequest).toHaveProperty('method', 'post');
    expect(updateQuantityRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/commerce/variants/set_quantity/variant-123'
    );
    expect(updateQuantityRequest).toHaveProperty('body', { quantity: 10 });
});

test('invoicing factory methods support clientRequestId parameter', () => {
    // Test that createInvoice supports clientRequestId parameter
    const createInvoiceRequest = invoicingFactory.createInvoice(
        { number: 'INV-001' } as any,
        'test-invoicing-invoice-id-123'
    );
    expect(createInvoiceRequest).toHaveProperty('clientRequestId', 'test-invoicing-invoice-id-123');
    expect(createInvoiceRequest).toHaveProperty('method', 'post');
    expect(createInvoiceRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/invoicing/invoices'
    );
    expect(createInvoiceRequest).toHaveProperty('body', { number: 'INV-001' });

    // Test that createProduct supports clientRequestId parameter
    const createProductRequest = invoicingFactory.createProduct(
        { name: 'Test Product' } as any,
        'test-invoicing-product-id-456'
    );
    expect(createProductRequest).toHaveProperty('clientRequestId', 'test-invoicing-product-id-456');
    expect(createProductRequest).toHaveProperty('method', 'post');
    expect(createProductRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/invoicing/products'
    );
    expect(createProductRequest).toHaveProperty('body', { name: 'Test Product' });

    // Test that createContact supports clientRequestId parameter
    const createContactRequest = invoicingFactory.createContact(
        { name: 'Test Contact' } as any,
        'test-invoicing-contact-id-789'
    );
    expect(createContactRequest).toHaveProperty('clientRequestId', 'test-invoicing-contact-id-789');
    expect(createContactRequest).toHaveProperty('method', 'post');
    expect(createContactRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/invoicing/contacts'
    );
    expect(createContactRequest).toHaveProperty('body', { name: 'Test Contact' });
});

test('pos factory methods support clientRequestId parameter', () => {
    // Test that createCustomer supports clientRequestId parameter
    const createCustomerRequest = posFactory.createCustomer(
        { name: 'Test Customer' } as any,
        'test-pos-customer-id-123'
    );
    expect(createCustomerRequest).toHaveProperty('clientRequestId', 'test-pos-customer-id-123');
    expect(createCustomerRequest).toHaveProperty('method', 'post');
    expect(createCustomerRequest).toHaveProperty('url', '/consumers/{consumer_id}/pos/customers');
    expect(createCustomerRequest).toHaveProperty('body', { name: 'Test Customer' });

    // Test that updateOrder supports clientRequestId parameter
    const updateOrderRequest = posFactory.updateOrder(
        'order-123',
        { status: 'completed' } as any,
        'test-pos-order-update-id-456'
    );
    expect(updateOrderRequest).toHaveProperty('clientRequestId', 'test-pos-order-update-id-456');
    expect(updateOrderRequest).toHaveProperty('method', 'patch');
    expect(updateOrderRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/pos/orders/order-123'
    );
    expect(updateOrderRequest).toHaveProperty('body', { status: 'completed' });
});

test('custom factory methods support clientRequestId parameter', () => {
    // Test that post supports clientRequestId parameter
    const postRequest = customFactory.post(
        'test-integration',
        'test-resource',
        { data: 'test' },
        undefined,
        'test-custom-post-id-123'
    );
    expect(postRequest).toHaveProperty('clientRequestId', 'test-custom-post-id-123');
    expect(postRequest).toHaveProperty('method', 'post');
    expect(postRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/custom/test-integration/test-resource'
    );
    expect(postRequest).toHaveProperty('body', { data: 'test' });

    // Test that patch supports clientRequestId parameter
    const patchRequest = customFactory.patch(
        'test-integration',
        'test-resource',
        { data: 'updated' },
        undefined,
        'test-custom-patch-id-456'
    );
    expect(patchRequest).toHaveProperty('clientRequestId', 'test-custom-patch-id-456');
    expect(patchRequest).toHaveProperty('method', 'patch');
    expect(patchRequest).toHaveProperty(
        'url',
        '/consumers/{consumer_id}/custom/test-integration/test-resource'
    );
    expect(patchRequest).toHaveProperty('body', { data: 'updated' });
});

test('additional accounting factory methods support clientRequestId parameter', () => {
    // Test that createJournal supports clientRequestId parameter
    const createJournalRequest = accountingFactory.createJournal(
        { name: 'Test Journal' } as any,
        undefined,
        'test-journal-request-id-111'
    );
    expect(createJournalRequest).toHaveProperty('clientRequestId', 'test-journal-request-id-111');
    expect(createJournalRequest).toHaveProperty('method', 'post');

    // Test that createBankAccount supports clientRequestId parameter
    const createBankAccountRequest = accountingFactory.createBankAccount(
        { name: 'Test Bank Account' } as any,
        undefined,
        'test-bank-account-request-id-222'
    );
    expect(createBankAccountRequest).toHaveProperty(
        'clientRequestId',
        'test-bank-account-request-id-222'
    );
    expect(createBankAccountRequest).toHaveProperty('method', 'post');

    // Test that updateSupplier supports clientRequestId parameter
    const updateSupplierRequest = accountingFactory.updateSupplier(
        'supplier-123',
        { name: 'Updated Supplier' } as any,
        undefined,
        'test-update-supplier-id-333'
    );
    expect(updateSupplierRequest).toHaveProperty('clientRequestId', 'test-update-supplier-id-333');
    expect(updateSupplierRequest).toHaveProperty('method', 'patch');
});

test('clientRequestId parameter defaults to undefined when not specified', () => {
    // Test that clientRequestId is undefined when not specified
    const createClientRequest = accountingFactory.createClient({ name: 'Test Client' } as any);
    expect(createClientRequest.clientRequestId).toBeUndefined();

    const createOrderRequest = ecommerceFactory.createOrder({ customer_id: 'cust-123' } as any);
    expect(createOrderRequest.clientRequestId).toBeUndefined();

    const createInvoiceRequest = invoicingFactory.createInvoice({ number: 'INV-001' } as any);
    expect(createInvoiceRequest.clientRequestId).toBeUndefined();

    const createCustomerRequest = posFactory.createCustomer({ name: 'Test Customer' } as any);
    expect(createCustomerRequest.clientRequestId).toBeUndefined();

    const customPostRequest = customFactory.post('test', 'resource', { data: 'test' });
    expect(customPostRequest.clientRequestId).toBeUndefined();
});
