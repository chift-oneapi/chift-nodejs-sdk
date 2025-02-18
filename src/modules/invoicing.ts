import { components, operations } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetInvoicesParams = AutoPaginatedParams<
    operations['invoicing_get_invoices']['parameters']['query']
>;

type GetContactsParams = AutoPaginatedParams<
    operations['invoicing_get_contacts']['parameters']['query']
>;

const invoicingFactory = {
    getInvoices(
        params?: GetInvoicesParams
    ): RequestData<components['schemas']['InvoiceItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            params: params,
        };
    },
    getInvoiceById(
        invoiceId: string,
        params?: operations['invoicing_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
            params: params,
        };
    },
    createInvoice(
        invoice: components['schemas']['backbone_common__models__invoicing__common__InvoiceItem']
    ): RequestData<components['schemas']['InvoiceItemOut']> {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            body: invoice,
        };
    },
    getProducts(): RequestData<components['schemas']['ProductItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products`,
        };
    },
    getProductById(productId: string): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products/${productId}`,
        };
    },
    createProduct(
        product: components['schemas']['backbone_common__models__invoicing__common__ProductItem']
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/invoicing/products`,
            body: product,
        };
    },
    getTaxes(): RequestData<components['schemas']['ChiftPage_InvoicingVatCode_'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes`,
        };
    },
    getTaxById(taxId: string): RequestData<components['schemas']['ChiftPage_InvoicingVatCode_']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes/${taxId}`,
        };
    },
    getOpportunities(): RequestData<components['schemas']['OpportunityItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities`,
        };
    },
    getOpportunitiesById(
        opportunityId: string
    ): RequestData<components['schemas']['OpportunityItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities/${opportunityId}`,
        };
    },
    getContacts(
        params?: GetContactsParams
    ): RequestData<components['schemas']['ContactItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            params: params,
        };
    },
    getContactById(contactId: string): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts/${contactId}`,
        };
    },
    createContact(
        contact: components['schemas']['ContactItemIn']
    ): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            body: contact,
        };
    },
    getPayments(): RequestData<components['schemas']['InvoicingPaymentItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payments`,
        };
    },
    getPaymentMethods(): RequestData<components['schemas']['InvoicingPaymentMethodItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payment-methods`,
        };
    },
};

export { invoicingFactory };
