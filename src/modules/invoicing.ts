import { components, operations } from '../types/public-api/schema';
import { RequestData } from '../types/api';

type getInvoicesByTypeParams = Omit<
    operations['invoicing_get_invoices_by_type']['parameters']['query'],
    'page' | 'size'
>;

type getContactsParams = Omit<
    operations['invoicing_get_contacts']['parameters']['query'],
    'page' | 'size'
>;

const invoicingFactory = {
    getInvoicesByType(
        invoice_type: components['schemas']['app__routers__invoicing__InvoiceType'],
        params: getInvoicesByTypeParams
    ): RequestData<components['schemas']['InvoiceItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
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
    getOpportunities(): RequestData<components['schemas']['OpportunitiesItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities`,
        };
    },
    getOpportunitiesById(
        opportunityId: string
    ): RequestData<components['schemas']['OpportunitiesItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities/${opportunityId}`,
        };
    },
    getContacts(params?: getContactsParams): RequestData<components['schemas']['ContactItem'][]> {
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
