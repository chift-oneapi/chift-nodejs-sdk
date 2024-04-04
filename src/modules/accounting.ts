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

type getOutstandingsParams = Omit<
    operations['accounting_get_outstandings']['parameters']['query'],
    'page' | 'size'
>;

const accountingFactory = {
    getAnalyticPlans(
        params: operations['accounting_get_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
        };
    },
    getClients(
        params: operations['accounting_get_clients']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
        };
    },
    createClient(
        client: components['schemas']['ClientItemIn'],
        params: operations['accounting_create_client']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/clients',
            body: client,
        };
    },
    getClient(
        clientId: string,
        params: operations['accounting_get_client']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
        };
    },
    updateClient(
        clientId: string,
        client: components['schemas']['ClientItemUpdate'],
        params: operations['accounting_update_client']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            body: client,
        };
    },
    getSuppliers(
        params: operations['accounting_get_suppliers']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
        };
    },
    createSupplier(
        supplier: components['schemas']['SupplierItemIn'],
        params: operations['accounting_create_supplier']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            body: supplier,
        };
    },
    getSupplier(
        supplierId: string,
        params: operations['accounting_get_supplier']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
        };
    },
    updateSupplier(
        supplierId: string,
        supplier: components['schemas']['SupplierItemUpdate'],
        params: operations['accounting_update_supplier']['parameters']['query']
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
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
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        params: operations['accounting_create_analytic_account']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            body: analyticAccount,
        };
    },
    getAnalyticAccounts(
        params: operations['accounting_get_analytic_accounts']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
        };
    },
    createAnalyticAccountWithMultiplePlans(
        analytic_plan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        params: operations['accounting_create_analytic_account_multi_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccount(
        analytic_account_id: string,
        params: operations['accounting_get_analytic_account']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
        };
    },
    updateAnalyticAccount(
        analytic_account_id: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate'],
        params: operations['accounting_update_analytic_account']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccountWithMultiplePlans(
        analytic_account_id: string,
        analytic_plan: string,
        params: operations['accounting_get_analytic_account_multi_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
        };
    },
    updateAnalyticAccountWithMultiplePlans(
        analytic_account_id: string,
        analytic_plan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate'],
        params: operations['accounting_update_analytic_account_multi_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccountsWithMultiplePlans(
        params: operations['accounting_get_analytic_accounts_multi_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans',
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
    getPaymentsByInvoiceId(
        invoice_id: string,
        params: operations['accounting_get_payments_by_invoice']['parameters']['query']
    ): RequestData<components['schemas']['Payment'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/${invoice_id}/payments`,
        };
    },
    getJournals(
        params: operations['accounting_get_journals']['parameters']['query']
    ): RequestData<components['schemas']['Journal'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journals`,
        };
    },
    getVatCodes(
        params: operations['accounting_get_vat_codes']['parameters']['query']
    ): RequestData<components['schemas']['app__routers__accounting__VatCode'][]> {
        return {
            params,
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
        operation: components['schemas']['MiscellaneousOperationIn'],
        params: operations['accounting_create_miscellaneous_operation']['parameters']['query']
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            body: operation,
        };
    },
    getMiscOperation(
        operation_id: string,
        params: operations['accounting_get_miscellaneous_operation']['parameters']['query']
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            params,
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
    getAttachments(
        params: operations['accounting_get_attachments']['parameters']['query']
    ): RequestData<components['schemas']['AttachmentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/attachments`,
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
        filter: components['schemas']['AccountBalanceFilter'],
        params: operations['accounting_get_accounts_balances']['parameters']['query']
    ): RequestData<components['schemas']['AccountBalance'][]> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts/balance',
            body: filter,
        };
    },
    getEmployees(
        params: operations['accounting_get_employees']['parameters']['query']
    ): RequestData<components['schemas']['EmployeeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/employees',
        };
    },
    getOutstandings(
        params: getOutstandingsParams
    ): RequestData<components['schemas']['OutstandingItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/outstandings',
        };
    },
    /**
     * @deprecated replaced by createFinancialEntry
     */
    createFinancialEntryOld(
        financial_entry: components['schemas']['FinancialEntryItemInOld'],
        params: operations['accounting_create_financial_entry']['parameters']['query']
    ): RequestData<components['schemas']['FinancialEntryItemOutOld']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/financial-entry',
            body: financial_entry,
        };
    },
    createFinancialEntry(
        financial_entry: components['schemas']['FinancialEntryItemIn'],
        params: operations['accounting_create_financial_entries']['parameters']['query']
    ): RequestData<components['schemas']['FinancialEntryItemOut'][]> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/financial-entries',
            body: financial_entry,
        };
    },
    createJournalEntryOld(
        journal_entry: components['schemas']['JournalEntryIn']
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/journal/entries',
            body: journal_entry,
        };
    },
    createJournalEntry(
        journal_entry: components['schemas']['GenericJournalEntry'],
        params: operations['accounting_create_generic_journal_entry']['parameters']['query']
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/journal-entries',
            body: journal_entry,
        };
    },
    matchEntries(
        body: components['schemas']['MatchingIn'],
        params: operations['accounting_match_entries']['parameters']['query']
    ): RequestData<components['schemas']['MatchingOut']> {
        return {
            params,
            body,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/matching',
        };
    },
    getFolders(): RequestData<components['schemas']['FolderItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/folders',
        };
    },
};

export { accountingFactory };
