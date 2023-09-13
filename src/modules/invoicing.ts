import { components, operations } from '../types/public-api/schema';
import { RequestData } from '../types/api';

const invoicingFactory = {
    getInvoices(
        params: operations['invoicing_get_invoices']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            params: params,
        };
    },
    getInvoiceById(
        invoiceId: string,
        params: operations['invoicing_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
            params: params,
        };
    },
    createInvoice(
        invoice: components['schemas']['InvoiceItem']
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
        product: components['schemas']['models__invoicing__ProductItem']
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/invoicing/products`,
            body: product,
        };
    },
    getTaxes(): RequestData<components['schemas']['models__invoicing__VatCode'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes`,
        };
    },
    getTaxById(taxId: string): RequestData<components['schemas']['models__invoicing__VatCode']> {
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
        params?: operations['invoicing_get_contacts']['parameters']['query']
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
};

export { invoicingFactory };
