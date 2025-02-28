import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetChartOfAccountsParams = AutoPaginatedParams<
    operations['accounting_get_chart_of_accounts']['parameters']['query']
>;

type GetMiscOperationsParams = AutoPaginatedParams<
    operations['accounting_get_miscellaneous_operations']['parameters']['query']
>;

type GetInvoicesByTypeWithMultiplePlansParams = AutoPaginatedParams<
    operations['accounting_get_invoices_by_type_multi_analytic_plans']['parameters']['query']
>;

type GetInvoicesByTypeParams = AutoPaginatedParams<
    operations['accounting_get_invoices_by_type']['parameters']['query']
>;

type GetOutstandingsParams = AutoPaginatedParams<
    operations['accounting_get_outstandings']['parameters']['query']
>;

type GetAnalyticPlansParams = AutoPaginatedParams<
    operations['accounting_get_analytic_plans']['parameters']['query']
>;

type GetVatCodesParams = AutoPaginatedParams<
    operations['accounting_get_vat_codes']['parameters']['query']
>;

type GetJournalsParams = AutoPaginatedParams<
    operations['accounting_get_journals']['parameters']['query']
>;

type GetJournalEntriesParams = AutoPaginatedParams<
    operations['accounting_get_journal_entries']['parameters']['query']
>;

type GetJournalEntriesWithMultiplePlansParams = AutoPaginatedParams<
    operations['accounting_get_journal_entries_multi_plan']['parameters']['query']
>;

type GetEmployeesParams = AutoPaginatedParams<
    operations['accounting_get_employees']['parameters']['query']
>;

type GetAttachmentsParams = AutoPaginatedParams<
    operations['accounting_get_attachments']['parameters']['query']
>;

type GetBalanceOfAccountsParams = AutoPaginatedParams<
    operations['accounting_get_accounts_balances']['parameters']['query']
>;

type GetClientsParams = AutoPaginatedParams<
    operations['accounting_get_clients']['parameters']['query']
>;

type GetSuppliersParams = AutoPaginatedParams<
    operations['accounting_get_suppliers']['parameters']['query']
>;

type GetAnalyticAccountsParams = AutoPaginatedParams<
    operations['accounting_get_analytic_accounts']['parameters']['query']
>;

type GetAnalyticAccountsWithMultiplePlansParams = AutoPaginatedParams<
    operations['accounting_get_analytic_accounts_multi_plans']['parameters']['query']
>;

type GetBookyearsParams = AutoPaginatedParams<
    operations['accounting_get_bookyears']['parameters']['query']
>;

const accountingFactory = {
    getAnalyticPlans(
        params?: GetAnalyticPlansParams
    ): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
        };
    },
    getClients(params?: GetClientsParams): RequestData<components['schemas']['ClientItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
        };
    },
    createClient(
        client: components['schemas']['ClientItemIn'],
        params?: operations['accounting_create_client']['parameters']['query']
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
        params?: operations['accounting_get_client']['parameters']['query']
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
        params?: operations['accounting_update_client']['parameters']['query']
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            body: client,
        };
    },
    getSuppliers(
        params?: GetSuppliersParams
    ): RequestData<components['schemas']['SupplierItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
        };
    },
    createSupplier(
        supplier: components['schemas']['SupplierItemIn'],
        params?: operations['accounting_create_supplier']['parameters']['query']
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
        params?: operations['accounting_get_supplier']['parameters']['query']
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
        params?: operations['accounting_update_supplier']['parameters']['query']
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
        params?: operations['accounting_create_invoice']['parameters']['query']
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
        params?: operations['accounting_create_invoice_multiple_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans',
            body: invoice,
        };
    },
    getInvoicesByType(
        invoice_type: components['schemas']['backbone_common__models__accounting__common__InvoiceType'],
        params?: GetInvoicesByTypeParams
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/type/${invoice_type}`,
        };
    },
    getInvoice(
        invoiceId: string,
        params?: operations['accounting_get_invoice']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/${invoiceId}`,
        };
    },
    getInvoiceWithMultiplePlans(
        invoiceId: string,
        params?: operations['accounting_get_invoice_multi_analytic_plans']['parameters']['query']
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/${invoiceId}`,
        };
    },
    getInvoicesByTypeWithMultiplePlans(
        invoice_type: components['schemas']['backbone_common__models__accounting__common__InvoiceType'],
        params?: GetInvoicesByTypeWithMultiplePlansParams
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/type/${invoice_type}`,
        };
    },
    createAnalyticAccount(
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        params?: operations['accounting_create_analytic_account']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            body: analyticAccount,
        };
    },
    getAnalyticAccounts(
        params?: GetAnalyticAccountsParams
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
        params?: operations['accounting_create_analytic_account_multi_plans']['parameters']['query']
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
        params?: operations['accounting_get_analytic_account']['parameters']['query']
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
        params?: operations['accounting_update_analytic_account']['parameters']['query']
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
        params?: operations['accounting_get_analytic_account_multi_plans']['parameters']['query']
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
        params?: operations['accounting_update_analytic_account_multi_plans']['parameters']['query']
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
        };
    },
    getAnalyticAccountsWithMultiplePlans(
        params?: GetAnalyticAccountsWithMultiplePlansParams
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans',
        };
    },
    getJournalEntries(
        params: GetJournalEntriesParams
    ): RequestData<components['schemas']['JournalEntryMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries`,
        };
    },
    getJournalEntriesWithMultiplePlans(
        params: GetJournalEntriesWithMultiplePlansParams
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/multi-analytic-plans`,
        };
    },
    getPaymentsByInvoiceId(
        invoice_id: string,
        params?: operations['accounting_get_payments_by_invoice']['parameters']['query']
    ): RequestData<components['schemas']['Payment'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/${invoice_id}/payments`,
        };
    },
    getJournals(params?: GetJournalsParams): RequestData<components['schemas']['Journal'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journals`,
        };
    },
    getVatCodes(
        params?: GetVatCodesParams
    ): RequestData<components['schemas']['AccountingVatCode'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/vat-codes`,
        };
    },
    getMiscOperations(
        params?: GetMiscOperationsParams
    ): RequestData<components['schemas']['MiscellaneousOperationOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
        };
    },
    createMiscOperation(
        operation: components['schemas']['MiscellaneousOperationIn'],
        params?: operations['accounting_create_miscellaneous_operation']['parameters']['query']
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
        params?: operations['accounting_get_miscellaneous_operation']['parameters']['query']
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
        params?: operations['accounting_add_attachment']['parameters']['query']
    ): RequestData<operations['accounting_add_attachment']['responses'][204]> {
        return {
            params,
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/invoices/pdf/${invoice_id}`,
            body: attachment,
        };
    },
    getAttachments(
        params: GetAttachmentsParams
    ): RequestData<components['schemas']['AttachmentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/attachments`,
        };
    },
    getChartOfAccounts(
        params?: GetChartOfAccountsParams
    ): RequestData<components['schemas']['AccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts',
        };
    },
    getBalanceOfAccounts(
        filter: components['schemas']['AccountBalanceFilter'],
        params?: GetBalanceOfAccountsParams
    ): RequestData<components['schemas']['AccountBalance'][]> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts/balance',
            body: filter,
        };
    },
    getEmployees(
        params?: GetEmployeesParams
    ): RequestData<components['schemas']['EmployeeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/employees',
        };
    },
    getOutstandings(
        params: GetOutstandingsParams
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
        params?: operations['accounting_create_financial_entry']['parameters']['query']
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
        params?: operations['accounting_create_financial_entries']['parameters']['query']
    ): RequestData<components['schemas']['FinancialEntryItemOut']> {
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
        params?: operations['accounting_create_generic_journal_entry']['parameters']['query']
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
        params?: operations['accounting_match_entries']['parameters']['query']
    ): RequestData<components['schemas']['MatchingOut']> {
        return {
            params,
            body,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/matching',
        };
    },
    matchEntriesMultiple(
        body: components['schemas']['MultipleMatchingIn'],
        params?: operations['accounting_match_entries_multiple']['parameters']['query']
    ): RequestData<components['schemas']['MultipleMatchingOut'][]> {
        return {
            params,
            body,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/matching-multiple',
        };
    },
    getFolders(): RequestData<components['schemas']['FolderItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/folders',
        };
    },
    getBookyears(params?: GetBookyearsParams): RequestData<components['schemas']['BookYear'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/bookyears',
        };
    },
};

export { accountingFactory };
