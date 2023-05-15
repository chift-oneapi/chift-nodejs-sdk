import { operations, components } from '../types/public-api/schema';
import { RequestData } from '../types/api';

type getChartOfAccountsParams = Omit<
    operations['accounting_get_chart_of_accounts']['parameters']['query'],
    'page' | 'size'
>;

type getMiscOperationsParams = Omit<
    operations['accounting_get_miscellaneous_operations']['parameters']['query'],
    'page' | 'size'
>;

type getJournalEntriesWithMultiplePlansParams = Omit<
    operations['accounting_get_journal_entries_mutli_plan']['parameters']['query'],
    'page' | 'size'
>;

type getJournalEntriesParams = Omit<
    operations['accounting_get_journal_entries']['parameters']['query'],
    'page' | 'size'
>;

type getInvoicesByTypeWithMultiplePlansParams = Omit<
    operations['accounting_get_invoices_by_type_multi_analytic_plans']['parameters']['query'],
    'page' | 'size'
>;

type getInvoicesByTypeParams = Omit<
    operations['accounting_get_invoices_by_type']['parameters']['query'],
    'page' | 'size'
>;

const accountingFactory = {
    getAnalyticPlans(): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
        };
    },
    getClients(): RequestData<components['schemas']['ClientItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
        };
    },
    createClient(
        client: components['schemas']['ClientItemIn']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/clients',
            body: client,
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
    getSuppliers(): RequestData<components['schemas']['SupplierItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
        };
    },
    createSupplier(
        supplier: components['schemas']['SupplierItemIn']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            body: supplier,
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
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices',
            body: invoice,
        };
    },
    createInvoiceWithMultiplePlans(
        invoice: components['schemas']['InvoiceItemInMultiAnalyticPlans'],
        params: operations['accounting_create_invoice_multiple_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans',
            body: invoice,
        };
    },
    getInvoicesByType(
        invoice_type: components['schemas']['app__routers__accounting__InvoiceType'],
        params: getInvoicesByTypeParams
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/type/${invoice_type}`,
        };
    },
    getInvoice(
        invoiceId: string,
        params: operations['accounting_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/${invoiceId}`,
        };
    },
    getInvoiceWithMultiplePlans(
        invoiceId: string,
        params: operations['accounting_get_invoice_multi_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/${invoiceId}`,
        };
    },
    getInvoicesByTypeWithMultiplePlans(
        invoice_type: components['schemas']['app__routers__accounting__InvoiceType'],
        params: getInvoicesByTypeWithMultiplePlansParams
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/type/${invoice_type}`,
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
        params: getJournalEntriesParams
    ): RequestData<components['schemas']['JournalEntryMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries`,
        };
    },
    getJournalEntriesWithMultiplePlans(
        params: getJournalEntriesWithMultiplePlansParams
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/multi-analytic-plans`,
        };
    },
    getPaymentsByInvoiceId(invoice_id: string): RequestData<components['schemas']['Payment'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/${invoice_id}/payments`,
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
        params: getMiscOperationsParams
    ): RequestData<components['schemas']['MiscellaneousOperationOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
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
            params,
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/invoices/pdf/${invoice_id}`,
            body: attachment,
        };
    },
    getChartOfAccounts(
        params: getChartOfAccountsParams
    ): RequestData<components['schemas']['AccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts',
        };
    },
    getBalanceOfAccounts(
        filter: components['schemas']['AccountBalanceFilter']
    ): RequestData<components['schemas']['AccountBalance'][]> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts/balance',
            body: filter,
        };
    },
};

export { accountingFactory };
