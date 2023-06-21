import { components, operations } from '../types/public-api/schema';
import { RequestData } from '../types/api';

const invoicingFactory = {
    getInvoices(
        params: operations['invoicing_get_invoices']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            params: params,
        };
    },
    getInvoiceById(
        invoiceId: string,
        params: operations['invoicing_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
            params: params,
        };
    },
    getProducts(): RequestData<components['schemas']['app__routers__invoicing__ProductItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products`,
        };
    },
    getProductById(
        productId: string
    ): RequestData<components['schemas']['app__routers__invoicing__ProductItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products/${productId}`,
        };
    },
    getVatCodes(): RequestData<components['schemas']['app__routers__invoicing__VatCode'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/vat-codes`,
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
    ): RequestData<components['schemas']['ContactItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            params: params,
        };
    },
    getContactById(contactId: string): RequestData<components['schemas']['ContactItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts/${contactId}`,
        };
    },
};

export { invoicingFactory };
