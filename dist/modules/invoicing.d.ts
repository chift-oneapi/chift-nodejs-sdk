import { components } from "../types/public-api/schema";
import { RequestData } from "../types/api";
declare const invoicingFactory: {
    getInvoicesByType(invoice_type: components["schemas"]["app__routers__invoicing__InvoiceType"]): RequestData<(components["schemas"]["InvoiceItem"])[]>;
    getInvoiceById(invoice_id: string): RequestData<(components["schemas"]["InvoiceItem"])>;
};
export { invoicingFactory, };
