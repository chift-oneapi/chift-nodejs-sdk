"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoicingFactory = void 0;
const invoicingFactory = {
    getInvoicesByType(invoice_type) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
        };
    },
    getInvoiceById(invoice_id) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoice_id}`,
        };
    }
};
exports.invoicingFactory = invoicingFactory;
