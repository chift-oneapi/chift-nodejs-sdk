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
        params?: GetInvoicesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['InvoiceItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            params: params,
            rawData,
        };
    },
    getInvoiceById(
        invoiceId: string,
        params?: operations['invoicing_get_invoice']['parameters']['query'],
        rawData?: boolean
    ): RequestData<components['schemas']['InvoiceItemOutSingle']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
            params: params,
            rawData,
        };
    },
    createInvoice(
        invoice: components['schemas']['InvoiceItem-Input'],
        clientRequestId?: string
    ): RequestData<components['schemas']['InvoiceItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            body: invoice,
            clientRequestId,
        };
    },
    getProducts(rawData?: boolean): RequestData<components['schemas']['ProductItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products`,
            rawData,
        };
    },
    getProductById(
        productId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products/${productId}`,
            rawData,
        };
    },
    createProduct(
        product: components['schemas']['ProductItem-Input'],
        clientRequestId?: string
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/products`,
            body: product,
            clientRequestId,
        };
    },
    getTaxes(rawData?: boolean): RequestData<components['schemas']['InvoicingVatCode'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes`,
            rawData,
        };
    },
    getTaxById(
        taxId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['InvoicingVatCode']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes/${taxId}`,
            rawData,
        };
    },
    getOpportunities(rawData?: boolean): RequestData<components['schemas']['OpportunityItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities`,
            rawData,
        };
    },
    getOpportunitiesById(
        opportunityId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['OpportunityItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities/${opportunityId}`,
            rawData,
        };
    },
    getContacts(
        params?: GetContactsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['ContactItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            params: params,
            rawData,
        };
    },
    getContactById(
        contactId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts/${contactId}`,
            rawData,
        };
    },
    createContact(
        contact: components['schemas']['ContactItemIn'],
        clientRequestId?: string
    ): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            body: contact,
            clientRequestId,
        };
    },
    getPayments(rawData?: boolean): RequestData<components['schemas']['InvoicingPaymentItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payments`,
            rawData,
        };
    },
    getPaymentMethods(
        rawData?: boolean
    ): RequestData<components['schemas']['InvoicingPaymentMethodItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payment-methods`,
            rawData,
        };
    },
};

export { invoicingFactory };
