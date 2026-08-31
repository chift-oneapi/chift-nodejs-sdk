import { expect, test } from '@jest/globals';
import { accountingFactory } from '../../src/modules/accounting';
import { ecommerceFactory } from '../../src/modules/ecommerce';

test('factory methods support the datalayer option on GET requests', () => {
    const getInvoicesRequest = accountingFactory.getInvoicesByType(
        'customer_invoice',
        {},
        { datalayer: true }
    );
    expect(getInvoicesRequest).toHaveProperty('datalayer', true);

    const getOrdersRequest = ecommerceFactory.getOrders({}, { datalayer: 'if_available' });
    expect(getOrdersRequest).toHaveProperty('datalayer', 'if_available');
});

test('factory methods support the datalayer option on write requests', () => {
    const createClientRequest = accountingFactory.createClient({ name: 'Acme' } as any, undefined, {
        datalayer: true,
        clientRequestId: 'req-1',
    });
    expect(createClientRequest).toHaveProperty('datalayer', true);
    expect(createClientRequest).toHaveProperty('clientRequestId', 'req-1');
});

test('datalayer defaults to undefined when not specified', () => {
    const getInvoicesRequest = accountingFactory.getInvoicesByType('customer_invoice');
    expect(getInvoicesRequest.datalayer).toBeUndefined();

    const getOrdersRequest = ecommerceFactory.getOrders({}, { rawData: true });
    expect(getOrdersRequest.datalayer).toBeUndefined();
});
