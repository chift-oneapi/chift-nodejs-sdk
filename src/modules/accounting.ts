import { operations, components } from '../types/public-api/schema';
import { RequestData } from '../types/api';

const accountingFactory = {
    getAnalyticPlans(
        params: operations['accounting_get_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
            params: params,
        };
    },
    getClients(
        params: operations['accounting_get_clients']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
            params: params,
        };
    },
    createClient(
        client: components['schemas']['ClientItemIn'],
        params: operations['accounting_create_client']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/clients',
            body: client,
            params: params,
        };
    },
    getClient(clientId: string): RequestData<components['schemas']['ClientItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
        };
    },
    updateClient(
        clientId: string,
        client: components['schemas']['ClientItemUpdate']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            body: client,
        };
    },
    getSuppliers(
        params: operations['accounting_get_suppliers']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            params: params,
        };
    },
    createSupplier(
        supplier: components['schemas']['SupplierItemIn'],
        params: operations['accounting_create_supplier']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            body: supplier,
            params: params,
        };
    },
    getSupplier(supplierId: string): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
        };
    },
    updateSupplier(
        supplierId: string,
        supplier: components['schemas']['SupplierItemUpdate']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
            body: supplier,
        };
    },
    createInvoice(
        invoice: components['schemas']['InvoiceItemInMonoAnalyticPlan'],
        params: operations['accounting_create_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices',
            body: invoice,
            params: params,
        };
    },
    createInvoiceWithMultiplePlans(
        invoice: components['schemas']['InvoiceItemInMultiAnalyticPlans'],
        params: operations['accounting_create_invoice_multiple_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans',
            body: invoice,
            params: params,
        };
    },
    getInvoicesByType(
        invoice_type: components['schemas']['app__routers__accounting__InvoiceType'],
        params: operations['accounting_get_invoices_by_type']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/type/${invoice_type}`,
            params: params,
        };
    },
    getInvoice(
        invoiceId: string,
        params: operations['accounting_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/${invoiceId}`,
            params: params,
        };
    },
    getInvoiceWithMultiplePlans(
        invoiceId: string,
        params: operations['accounting_get_invoice_multi_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/${invoiceId}`,
            params: params,
        };
    },
    getInvoicesByTypeWithMultiplePlans(
        invoice_type: components['schemas']['app__routers__accounting__InvoiceType'],
        params: operations['accounting_get_invoices_by_type_multi_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/type/${invoice_type}`,
            params: params,
        };
    },
    createAnalyticAccount(
        analyticAccount: components['schemas']['AnalyticAccountItemIn']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            body: analyticAccount,
        };
    },
    getAnalyticAccounts(): RequestData<components['schemas']['AnalyticAccountItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
        };
    },
    createAnalyticAccountWithMultiplePlans(
        analytic_plan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemIn']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccount(
        analytic_account_id: string
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
        };
    },
    updateAnalyticAccount(
        analytic_account_id: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccountWithMultiplePlans(
        analytic_account_id: string,
        analytic_plan: string
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
        };
    },
    updateAnalyticAccountWithMultiplePlans(
        analytic_account_id: string,
        analytic_plan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccountsWithMultiplePlans(): RequestData<
        components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans'][]
    > {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans',
        };
    },
    getAnalyticLinesOfAccount(
        analytic_account_id: string
    ): RequestData<components['schemas']['AnalyticAccountLineItemOut'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-account-lines/account/${analytic_account_id}`,
        };
    },
    getJournalEntries(
        params: operations['accounting_get_journal_entries']['parameters']['query']
    ): RequestData<components['schemas']['JournalEntryMonoAnalyticPlan'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries`,
            params: params,
        };
    },
    getJournalEntriesWithMultiplePlans(
        params: operations['accounting_get_journal_entries_mutli_plan']['parameters']['query']
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/multi-analytic-plans`,
            params: params,
        };
    },
    getPaymentsByInvoiceId(): RequestData<components['schemas']['Payment'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/{invoice_id}/payments`,
        };
    },
    getJournals(): RequestData<components['schemas']['Journal'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journals`,
        };
    },
    getVatCodes(): RequestData<components['schemas']['app__routers__accounting__VatCode'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/vat-codes`,
        };
    },
    getMiscOperations(
        params: operations['accounting_get_miscellaneous_operations']['parameters']['query']
    ): RequestData<components['schemas']['MiscellaneousOperationOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            params: params,
        };
    },
    createMiscOperation(
        operation: components['schemas']['MiscellaneousOperationIn']
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            body: operation,
        };
    },
    getMiscOperation(
        operation_id: string
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/miscellaneous-operation/${operation_id}`,
        };
    },
    attachPDF(
        invoice_id: string,
        attachment: components['schemas']['AttachmentItem'],
        params: operations['accounting_add_attachment']['parameters']['query']
    ): RequestData<operations['accounting_add_attachment']['responses'][201]> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/invoices/pdf/${invoice_id}`,
            body: attachment,
            params: params,
        };
    },
    getChartOfAccounts(
        params: operations['accounting_get_chart_of_accounts']['parameters']['query']
    ): RequestData<components['schemas']['AccountItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts',
            params: params,
        };
    },
    getBalanceOfAccounts(
        params: operations['accounting_get_chart_of_accounts']['parameters']['query'],
        filter: components['schemas']['AccountBalanceFilter']
    ): RequestData<components['schemas']['AccountBalance'][]> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts/balance',
            params: params,
            body: filter,
        };
    },
};

export { accountingFactory };
