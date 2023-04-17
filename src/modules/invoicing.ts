import { components, operations } from '../types/public-api/schema';
import { RequestData } from '../types/api';

const invoicingFactory = {
    getInvoicesByType(
        invoice_type: components['schemas']['app__routers__invoicing__InvoiceType'],
        params: operations['invoicing_get_invoices_by_type']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
            params: params,
        };
    },
    getInvoiceById(invoice_id: string): RequestData<components['schemas']['InvoiceItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoice_id}`,
        };
    },
};

export { invoicingFactory };
