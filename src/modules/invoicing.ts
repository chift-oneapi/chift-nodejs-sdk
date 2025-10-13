import { components, operations } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption, ClientRequestOption } from '../types/api';

type GetInvoicesParams = AutoPaginatedParams<
    operations['invoicing_get_invoices']['parameters']['query']
>;

type GetContactsParams = AutoPaginatedParams<
    operations['invoicing_get_contacts']['parameters']['query']
>;

type GetBankAccountsParams = AutoPaginatedParams<
    operations['invoicing_get_bank_accounts']['parameters']['query']
>;

type GetBankTransactionsParams = AutoPaginatedParams<
    operations['invoicing_get_bank_transactions']['parameters']['query']
>;

const invoicingFactory = {
    getInvoices(
        params?: GetInvoicesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            params: params,
            rawData: options?.rawData,
        };
    },
    getInvoiceById(
        invoiceId: string,
        params?: operations['invoicing_get_invoice']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOutSingle']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
            params: params,
            rawData: options?.rawData,
        };
    },
    createInvoice(
        invoice: components['schemas']['InvoiceItem-Input'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['InvoiceItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/invoices`,
            body: invoice,
            clientRequestId: options?.clientRequestId,
        };
    },
    getProducts(options?: RawDataOption): RequestData<components['schemas']['ProductItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products`,
            rawData: options?.rawData,
        };
    },
    getProductById(
        productId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/products/${productId}`,
            rawData: options?.rawData,
        };
    },
    createProduct(
        product: components['schemas']['ProductItem-Input'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['ProductItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/products`,
            body: product,
            clientRequestId: options?.clientRequestId,
        };
    },
    getTaxes(options?: RawDataOption): RequestData<components['schemas']['InvoicingVatCode'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes`,
            rawData: options?.rawData,
        };
    },
    getTaxById(
        taxId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoicingVatCode']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/taxes/${taxId}`,
            rawData: options?.rawData,
        };
    },
    getOpportunities(
        options?: RawDataOption
    ): RequestData<components['schemas']['OpportunityItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities`,
            rawData: options?.rawData,
        };
    },
    getOpportunitiesById(
        opportunityId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['OpportunityItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/opportunities/${opportunityId}`,
            rawData: options?.rawData,
        };
    },
    getContacts(
        params?: GetContactsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ContactItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            params: params,
            rawData: options?.rawData,
        };
    },
    getContactById(
        contactId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/contacts/${contactId}`,
            rawData: options?.rawData,
        };
    },
    createContact(
        contact: components['schemas']['ContactItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['ContactItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/contacts`,
            body: contact,
            clientRequestId: options?.clientRequestId,
        };
    },
    getPayments(
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoicingPaymentItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payments`,
            rawData: options?.rawData,
        };
    },
    getPaymentMethods(
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoicingPaymentMethodItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/payment-methods`,
            rawData: options?.rawData,
        };
    },
    getBankAccounts(
        params?: GetBankAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ChiftPage_InvoicingBankAccountItem_']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/bank-accounts`,
            params: params,
            rawData: options?.rawData,
        };
    },
    getBankTransactions(
        params: GetBankTransactionsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ChiftPage_InvoicingBankTransactionItem_']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/bank-transactions`,
            params: params,
            rawData: options?.rawData,
        };
    },
    uploadDocument(
        document: components['schemas']['AttachmentItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['UploadDocumentItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/invoicing/upload-document`,
            body: document,
            clientRequestId: options?.clientRequestId,
        };
    },
};

export { invoicingFactory };
