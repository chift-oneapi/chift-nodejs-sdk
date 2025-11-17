import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption, ClientRequestOption } from '../types/api';

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

type GetSchemesParams = AutoPaginatedParams<
    operations['accounting_get_schemes']['parameters']['query']
>;

type GetBankAccountsParams = AutoPaginatedParams<
    operations['accounting_get_bank_accounts']['parameters']['query']
>;

const accountingFactory = {
    getAnalyticPlans(
        params?: GetAnalyticPlansParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-plans',
            rawData: options?.rawData,
        };
    },
    getClients(
        params?: GetClientsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ClientItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/clients',
            rawData: options?.rawData,
        };
    },
    createClient(
        client: components['schemas']['ClientItemIn'],
        params?: operations['accounting_create_client']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/clients',
            body: client,
            clientRequestId: options?.clientRequestId,
        };
    },
    getClient(
        clientId: string,
        params?: operations['accounting_get_client']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            rawData: options?.rawData,
        };
    },
    updateClient(
        clientId: string,
        client: components['schemas']['ClientItemUpdate'],
        params?: operations['accounting_update_client']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['ClientItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/clients/${clientId}`,
            body: client,
            clientRequestId: options?.clientRequestId,
        };
    },
    getSuppliers(
        params?: GetSuppliersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['SupplierItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            rawData: options?.rawData,
        };
    },
    createSupplier(
        supplier: components['schemas']['SupplierItemIn'],
        params?: operations['accounting_create_supplier']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/suppliers',
            body: supplier,
            clientRequestId: options?.clientRequestId,
        };
    },
    getSupplier(
        supplierId: string,
        params?: operations['accounting_get_supplier']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
            rawData: options?.rawData,
        };
    },
    updateSupplier(
        supplierId: string,
        supplier: components['schemas']['SupplierItemUpdate'],
        params?: operations['accounting_update_supplier']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SupplierItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/suppliers/${supplierId}`,
            body: supplier,
            clientRequestId: options?.clientRequestId,
        };
    },
    createInvoice(
        invoice: components['schemas']['InvoiceItemInMonoAnalyticPlan'],
        params?: operations['accounting_create_invoice']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices',
            body: invoice,
            clientRequestId: options?.clientRequestId,
        };
    },
    createInvoiceWithMultiplePlans(
        invoice: components['schemas']['InvoiceItemInMultiAnalyticPlans'],
        params?: operations['accounting_create_invoice_multiple_plans']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans',
            body: invoice,
            clientRequestId: options?.clientRequestId,
        };
    },
    getInvoicesByType(
        invoice_type: components['schemas']['backbone_common__models__accounting__common__InvoiceType'],
        params?: GetInvoicesByTypeParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/type/${invoice_type}`,
            rawData: options?.rawData,
        };
    },
    getInvoice(
        invoiceId: string,
        params?: operations['accounting_get_invoice']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOutMonoAnalyticPlan']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/${invoiceId}`,
            rawData: options?.rawData,
        };
    },
    getInvoiceWithMultiplePlans(
        invoiceId: string,
        params?: operations['accounting_get_invoice_multi_analytic_plans']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/${invoiceId}`,
            rawData: options?.rawData,
        };
    },
    getInvoicesByTypeWithMultiplePlans(
        invoice_type: components['schemas']['backbone_common__models__accounting__common__InvoiceType'],
        params?: GetInvoicesByTypeWithMultiplePlansParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['InvoiceItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/multi-analytic-plans/type/${invoice_type}`,
            rawData: options?.rawData,
        };
    },
    createAnalyticAccount(
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        params?: operations['accounting_create_analytic_account']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            body: analyticAccount,
            clientRequestId: options?.clientRequestId,
        };
    },
    getAnalyticAccounts(
        params?: GetAnalyticAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticAccountItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts',
            rawData: options?.rawData,
        };
    },
    createAnalyticAccountWithMultiplePlans(
        analytic_plan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        params?: operations['accounting_create_analytic_account_multi_plans']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans/${analytic_plan}`,
            body: analyticAccount,
            clientRequestId: options?.clientRequestId,
        };
    },
    getAnalyticAccount(
        analytic_account_id: string,
        params?: operations['accounting_get_analytic_account']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
            rawData: options?.rawData,
        };
    },
    updateAnalyticAccount(
        analytic_account_id: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate'],
        params?: operations['accounting_update_analytic_account']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AnalyticAccountItemOut']> {
        return {
            params,
            method: 'patch',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}`,
            body: analyticAccount,
            clientRequestId: options?.clientRequestId,
        };
    },
    getAnalyticAccountWithMultiplePlans(
        analytic_account_id: string,
        analytic_plan: string,
        params?: operations['accounting_get_analytic_account_multi_plans']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/analytic-accounts/${analytic_account_id}/multi-analytic-plans/${analytic_plan}`,
            rawData: options?.rawData,
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
        params?: GetAnalyticAccountsWithMultiplePlansParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticAccountItemOutMultiAnalyticPlans'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/analytic-accounts/multi-analytic-plans',
            rawData: options?.rawData,
        };
    },
    getJournalEntries(
        params: GetJournalEntriesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['JournalEntryMonoAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries`,
            rawData: options?.rawData,
        };
    },
    getJournalEntriesWithMultiplePlans(
        params: GetJournalEntriesWithMultiplePlansParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/multi-analytic-plans`,
            rawData: options?.rawData,
        };
    },
    getPaymentsByInvoiceId(
        invoice_id: string,
        params?: operations['accounting_get_payments_by_invoice']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['Payment'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/invoices/id/${invoice_id}/payments`,
            rawData: options?.rawData,
        };
    },
    getJournals(
        params?: GetJournalsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['Journal'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journals`,
            rawData: options?.rawData,
        };
    },
    createJournal(
        journal: components['schemas']['JournalIn'],
        params?: operations['accounting_create_journal']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['Journal']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/journal',
            body: journal,
            clientRequestId: options?.clientRequestId,
        };
    },
    getVatCodes(
        params?: GetVatCodesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AccountingVatCode'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/vat-codes`,
            rawData: options?.rawData,
        };
    },
    getMiscOperations(
        params?: GetMiscOperationsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['MiscellaneousOperationOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            rawData: options?.rawData,
        };
    },
    createMiscOperation(
        operation: components['schemas']['MiscellaneousOperationIn'],
        params?: operations['accounting_create_miscellaneous_operation']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/miscellaneous-operation',
            body: operation,
            clientRequestId: options?.clientRequestId,
        };
    },
    getMiscOperation(
        operation_id: string,
        params?: operations['accounting_get_miscellaneous_operation']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['MiscellaneousOperationOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/miscellaneous-operation/${operation_id}`,
            rawData: options?.rawData,
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
        params: GetAttachmentsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AttachmentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/attachments`,
            rawData: options?.rawData,
        };
    },
    getChartOfAccounts(
        params?: GetChartOfAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/chart-of-accounts',
            rawData: options?.rawData,
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
        params?: GetEmployeesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['EmployeeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/employees',
            rawData: options?.rawData,
        };
    },
    getOutstandings(
        params: GetOutstandingsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['OutstandingItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/outstandings',
            rawData: options?.rawData,
        };
    },
    createFinancialEntry(
        financial_entry: components['schemas']['FinancialEntryItemIn'],
        params?: operations['accounting_create_financial_entries']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['FinancialEntryItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/financial-entries',
            body: financial_entry,
            clientRequestId: options?.clientRequestId,
        };
    },
    createJournalEntry(
        journal_entry: components['schemas']['GenericJournalEntry'],
        params?: operations['accounting_create_generic_journal_entry']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/journal-entries',
            body: journal_entry,
            clientRequestId: options?.clientRequestId,
        };
    },
    matchEntries(
        body: components['schemas']['MatchingIn'],
        params?: operations['accounting_match_entries']['parameters']['query']
    ): RequestData<components['schemas']['MatchingOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/matching',
            body,
        };
    },
    matchEntriesMultiple(
        body: components['schemas']['MultipleMatchingIn'],
        params?: operations['accounting_match_entries_multiple']['parameters']['query']
    ): RequestData<components['schemas']['MultipleMatchingOut'][]> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/matching-multiple',
            body,
        };
    },
    createExpense(
        expense: components['schemas']['ExpenseItemIn'],
        params?: operations['accounting_create_expense']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['ExpenseItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/expenses',
            body: expense,
            clientRequestId: options?.clientRequestId,
        };
    },
    getFolders(options?: RawDataOption): RequestData<components['schemas']['FolderItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/folders',
            rawData: options?.rawData,
        };
    },
    getBookyears(
        params?: GetBookyearsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BookYear'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/bookyears',
            rawData: options?.rawData,
        };
    },
    createLedgerAccount(
        account: components['schemas']['LedgerAccountItemIn'],
        params?: operations['accounting_create_ledger_account']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AccountItem']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/accounts',
            body: account,
            clientRequestId: options?.clientRequestId,
        };
    },
    createBankAccount(
        bankAccount: components['schemas']['BankAccountItemIn'],
        params?: operations['accounting_create_bank_account']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['BankAccountItemOut']> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/bank-accounts',
            body: bankAccount,
            clientRequestId: options?.clientRequestId,
        };
    },
    getJournalEntry(
        journalEntryId: string,
        params?: operations['accounting_get_journal_entry']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['JournalEntryMultiAnalyticPlan']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/journal/entries/${journalEntryId}`,
            rawData: options?.rawData,
        };
    },

    getPaymentMethods(
        params?: operations['accounting_get_payment_methods']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['ChiftPage_AccountingPaymentMethod_']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/accounting/payment-methods`,
            rawData: options?.rawData,
        };
    },

    createInvoicePayment(
        body: components['schemas']['AccountingInvoicePaymentIn'],
        params?: operations['accounting_create_invoice_payment']['parameters']['query']
    ): RequestData<operations['accounting_create_invoice_payment']['responses'][204]> {
        return {
            params,
            method: 'post',
            url: `/consumers/{consumer_id}/accounting/invoices/payments`,
            body,
        };
    },

    getSchemes(
        params?: GetSchemesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['SchemeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/schemes',
            rawData: options?.rawData,
        };
    },

    getBankAccounts(
        params?: GetBankAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BankAccountItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/bank-accounts',
            rawData: options?.rawData,
        };
    },

    createBankTransactions(
        body: components['schemas']['BankTransactionItemIn'][],
        params?: operations['accounting_create_bank_transactions']['parameters']['query'],
        options?: ClientRequestOption
    ): RequestData<operations['accounting_create_bank_transactions']['responses'][200]> {
        return {
            params,
            method: 'post',
            url: '/consumers/{consumer_id}/accounting/bank-transactions',
            body,
            clientRequestId: options?.clientRequestId,
        };
    },

    exportFEC(
        params?: operations['accounting_export_fec']['parameters']['query']
    ): RequestData<operations['accounting_export_fec']['responses'][200]['content']['application/json']> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/accounting/export-fec',
        };
    },
};

export { accountingFactory };
