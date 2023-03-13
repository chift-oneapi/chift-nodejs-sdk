"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountingFactory = void 0;
const accountingFactory = {
    getAnalyticPlans(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
            params: params
        };
    },
    getClients(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
            params: params
        };
    },
    createClient(client) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/clients',
            body: client
        };
    },
    getClient(clientId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
        };
    },
    updateClient(clientId, client) {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            body: client
        };
    },
    getSuppliers(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            params: params
        };
    },
    createSupplier(supplier) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            body: supplier
        };
    },
    getSupplier(supplierId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
        };
    },
    updateSupplier(supplierId, supplier) {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
            body: supplier
        };
    },
    createInvoice(params, invoice) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices',
            body: invoice,
            params: params
        };
    },
    createInvoiceWithMultiplePlans(params, invoice) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans',
            body: invoice,
            params: params
        };
    },
    getInvoicesByType(invoice_type, params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/type/${invoice_type}`,
            params: params
        };
    },
    getInvoice(invoiceId, params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/${invoiceId}`,
            params: params
        };
    },
    getInvoiceWithMultiplePlans(invoiceId, params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/${invoiceId}`,
            params: params
        };
    },
    getInvoicesByTypeWithMultiplePlans(invoice_type, params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/type/${invoice_type}`,
            params: params
        };
    },
    createAnalyticAccount(analyticAccount) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            body: analyticAccount,
        };
    },
    getAnalyticAccounts() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
        };
    },
    createAnalyticAccountWithMultiplePlans(analytic_plan, analyticAccount) {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccount(analytic_account_id) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
        };
    },
    updateAnalyticAccount(analytic_account_id, analyticAccount) {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
            body: analyticAccount
        };
    },
    getAnalyticAccountWithMultiplePlans(analytic_account_id, analytic_plan) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
        };
    },
    updateAnalyticAccountWithMultiplePlans(analytic_account_id, analytic_plan, analyticAccount) {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount
        };
    },
    getAnalyticAccountsWithMultiplePlans() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans',
        };
    },
    getAnalyticLinesOfAccount(analytic_account_id) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-account-lines/account/${analytic_account_id}`,
        };
    },
    getJournalEntries(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries`,
            params: params
        };
    },
    getJournalEntriesWithMultiplePlans(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/multi-analytic-plans`,
            params: params
        };
    },
    getPaymentsByInvoiceId(invoice_id) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/{invoice_id}/payments`,
        };
    },
    getJournals() {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journals`,
        };
    },
    getVatCodes() {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/vat-codes`,
        };
    },
    getMiscOperations(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            params: params
        };
    },
    createMiscOperation(operation) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            body: operation
        };
    },
    getMiscOperation(operation_id) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/miscellaneous-operation/${operation_id}`,
        };
    },
    attachPDF(invoice_id, attachment, params) {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/invoices/pdf/${invoice_id}`,
            body: attachment,
            params: params
        };
    },
    getChartOfAccounts(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts',
            params: params
        };
    },
    getBalanceOfAccounts(params, filter) {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts/balance',
            params: params,
            body: filter
        };
    },
};
exports.accountingFactory = accountingFactory;
