import { components } from "../types/public-api/schema";
import { RequestData } from "../types/api";

const invoicingFactory = {
    getInvoicesByType(invoice_type: components["schemas"]["app__routers__invoicing__InvoiceType"]): RequestData<(components["schemas"]["InvoiceItem"])[]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
        }
    },
    getInvoiceById(invoice_id: string): RequestData<(components["schemas"]["InvoiceItem"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoice_id}`,
        }
    }
}

export {
    invoicingFactory,
}