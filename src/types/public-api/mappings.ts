export type chiftOperations = {
    // Token operations
    generateAccessToken: 'generate_access_token_token_post';
    generateMCPToken: 'generate_mcp_token_mcp_token_post';

    // Consumer operations
    getConsumers: 'consumers_get_consumers';
    createConsumer: 'consumers_create_consumer';
    getConsumerById: 'consumers_get_consumer';
    updateConsumer: 'consumers_update_consumer';
    deleteConsumerById: 'consumers_delete_consumer';

    // Connection operations
    getConnectionsByConsumerId: 'connections_get_connections';
    createConnection: 'connections_create_connection';
    deleteConnectionById: 'connections_delete_connection';
    updateConnection: 'connections_update_connection';
    getTransactionByClientRequestId: 'get_transaction_by_client_request_id_consumers__consumer_id__connections__connection_id__transactions_get';

    // Integration operations
    getIntegrations: 'integrations_get_integrations';
    getIntegrationLogo: 'integrations_get_integration_logo_json';

    // Webhook operations
    getWebhookTypes: 'webhooks_get_webhook_types';
    getWebhooks: 'webhooks_get_webhooks';
    registerWebhook: 'webhooks_create_webhook';
    unRegisterWebhook: 'webhooks_delete_webhook';
    getWebhookById: 'webhooks_get_webhook';
    updateWebhookById: 'webhooks_update_webhook';
    getWebhookLogsByWebhookId: 'webhooks_get_webhook_logs';

    // Sync operations
    getSyncs: 'syncs_get_syncs';
    createSync: 'syncs_post_sync';
    getSync: 'syncs_get_sync';
    sendCustomEvent: 'syncs_send_custom_event';
    getConsumerExecutions: 'syncs_get_consumer_executions';
    getExecution: 'syncs_get_execution';
    createSyncToConsumer: 'syncs_create_synctoconsumer';
    getSyncConsumer: 'syncs_get_syncconsumer';
    updateSyncToConsumer: 'syncs_update_synctoconsumer';
    enableSyncConsumer: 'syncs_enable_syncconsumer';
    updateFlowToConsumer: 'syncs_update_flowtoconsumer';

    // Datastore operations
    getDatastores: 'datastores_get_datastores';
    getConsumerDatastoreData: 'datastores_get_consumer_and_datastoredata';
    createConsumerDatastoreData: 'datastores_create_consumer_datastoredata';
    deleteConsumerDatastoreData: 'datastores_delete_consumer_datastoredata';
    updateConsumerDatastoreData: 'datastores_update_consumer_datastoredata';

    // Accounting operations
    getFolders: 'accounting_get_folders';
    getBookyears: 'accounting_get_bookyears';
    getAnalyticPlans: 'accounting_get_analytic_plans';
    getSchemes: 'accounting_get_schemes';
    getClients: 'accounting_get_clients';
    createClient: 'accounting_create_client';
    getClient: 'accounting_get_client';
    updateClient: 'accounting_update_client';
    getSuppliers: 'accounting_get_suppliers';
    createSupplier: 'accounting_create_supplier';
    getSupplier: 'accounting_get_supplier';
    updateSupplier: 'accounting_update_supplier';
    createInvoice: 'accounting_create_invoice';
    createInvoiceMultiplePlans: 'accounting_create_invoice_multiple_plans';
    createInvoicePayment: 'accounting_create_invoice_payment';
    getInvoicesByType: 'accounting_get_invoices_by_type';
    getInvoicesByTypeMultiPlans: 'accounting_get_invoices_by_type_multi_analytic_plans';
    getInvoice: 'accounting_get_invoice';
    getInvoiceMultiPlans: 'accounting_get_invoice_multi_analytic_plans';
    createLedgerAccount: 'accounting_create_ledger_account';
    createBankAccount: 'accounting_create_bank_account';
    getBankAccounts: 'accounting_get_bank_accounts';
    createBankTransactions: 'accounting_create_bank_transactions';
    getAnalyticAccounts: 'accounting_get_analytic_accounts';
    createAnalyticAccount: 'accounting_create_analytic_account';
    createAnalyticAccountMultiPlans: 'accounting_create_analytic_account_multi_plans';
    getAnalyticAccount: 'accounting_get_analytic_account';
    updateAnalyticAccount: 'accounting_update_analytic_account';
    getAnalyticAccountMultiPlans: 'accounting_get_analytic_account_multi_plans';
    updateAnalyticAccountMultiPlans: 'accounting_update_analytic_account_multi_plans';
    getAnalyticAccountsMultiPlans: 'accounting_get_analytic_accounts_multi_plans';
    getJournalEntries: 'accounting_get_journal_entries';
    getJournalEntriesMultiPlan: 'accounting_get_journal_entries_multi_plan';
    getJournalEntry: 'accounting_get_journal_entry';
    createGenericJournalEntry: 'accounting_create_generic_journal_entry';
    createExpense: 'accounting_create_expense';
    getPaymentsByInvoice: 'accounting_get_payments_by_invoice';
    getAccountingPaymentMethods: 'accounting_get_payment_methods';
    getJournals: 'accounting_get_journals';
    createJournal: 'accounting_create_journal';
    getVatCodes: 'accounting_get_vat_codes';
    getMiscellaneousOperations: 'accounting_get_miscellaneous_operations';
    createMiscellaneousOperation: 'accounting_create_miscellaneous_operation';
    getMiscellaneousOperation: 'accounting_get_miscellaneous_operation';
    matchEntries: 'accounting_match_entries';
    matchEntriesMultiple: 'accounting_match_entries_multiple';
    addAttachment: 'accounting_add_attachment';
    getAttachments: 'accounting_get_attachments';
    getChartOfAccounts: 'accounting_get_chart_of_accounts';
    getAccountsBalances: 'accounting_get_accounts_balances';
    getEmployees: 'accounting_get_employees';
    createFinancialEntries: 'accounting_create_financial_entries';
    getOutstandings: 'accounting_get_outstandings';
    exportFEC: 'accounting_export_fec';

    // POS operations
    getOrders: 'pos_get_orders';
    getOrder: 'pos_get_order';
    updateOrder: 'pos_update_pos_customer';
    getLocations: 'pos_get_locations';
    getPayments: 'pos_get_payments';
    getSales: 'pos_get_sales';
    getPaymentMethods: 'pos_get_payments_methods';
    getCustomers: 'pos_get_customers';
    createCustomer: 'pos_create_pos_customer';
    getCustomer: 'pos_get_customer';
    getProductCategories: 'pos_get_product_categories';
    getProducts: 'pos_get_products';
    getAccountingCategories: 'pos_get_accounting_categories';
    getClosure: 'pos_get_closure';
    getObjectives: 'pos_get_objectives';

    // eCommerce operations
    getCommerceCustomers: 'ecommerce_get_customers';
    getCommerceCustomer: 'ecommerce_get_customer';
    getCommerceProducts: 'ecommerce_get_products';
    getCommerceProduct: 'ecommerce_get_product';
    getVariant: 'ecommerce_get_variant';
    updateVariantQuantity: 'ecommerce_update_variant_quantity';
    getCommerceLocations: 'ecommerce_get_locations';
    getCommerceOrders: 'ecommerce_get_orders';
    createCommerceOrder: 'ecommerce_create_order';
    getCommerceOrder: 'ecommerce_get_order';
    getCommercePaymentMethods: 'ecommerce_get_payments_methods';
    getCommerceProductCategories: 'ecommerce_get_product_categories';
    getTaxes: 'ecommerce_get_taxes';
    getCountries: 'ecommerce_get_countries';

    // Invoicing operations
    getInvoicingInvoices: 'invoicing_get_invoices';
    createInvoicingInvoice: 'invoicing_post_invoices';
    getInvoicingInvoice: 'invoicing_get_invoice';
    getInvoicingTaxes: 'invoicing_get_taxes';
    getInvoicingTax: 'invoicing_get_tax';
    getInvoicingProducts: 'invoicing_get_products';
    createInvoicingProduct: 'invoicing_post_products';
    getInvoicingProduct: 'invoicing_get_product';
    getOpportunities: 'invoicing_get_opportunities';
    getOpportunity: 'invoicing_get_opportunity';
    getContacts: 'invoicing_get_contacts';
    createContact: 'invoicing_post_contacts';
    getContact: 'invoicing_get_contact';
    getInvoicingPayments: 'invoicing_get_payments';
    getInvoicingPaymentMethods: 'invoicing_get_payments_methods';
    getInvoicingBankAccounts: 'invoicing_get_bank_accounts';
    getInvoicingBankTransactions: 'invoicing_get_bank_transactions';
    uploadDocument: 'invoicing_upload_document';

    // Banking operations
    getFinancialInstitutions: 'banking_get_financial_institutions';
    getBankingAccounts: 'banking_get_accounts';
    getAccountTransactions: 'banking_get_account_transactions';
    getAccountCounterparts: 'banking_get_account_counterparts';
    getBankingAttachments: 'banking_get_attachments';

    // Payment operations
    getBalances: 'payment_get_balances';
    getTransactions: 'payment_get_transaction';
    getPaymentPayments: 'payment_get_payments';
    getPayment: 'payment_get_payment';
    getRefunds: 'payment_get_refunds';

    // Issues operations
    getIssues: 'issues_get_issues';
    getIssuesByConsumerId: 'issues_get_issues_by_consumer_id';
    getIssue: 'issues_get_issue';

    // PMS operations
    getPMSOrders: 'pms_get_orders';
    getPMSInvoices: 'pms_get_invoices';
    getPMSCustomers: 'pms_get_customers';
    getPMSCustomer: 'pms_get_customer';
    getPMSLocations: 'pms_get_locations';
    getPMSPayments: 'pms_get_payments';
    getPMSPaymentMethods: 'pms_get_payments_methods';
    getPMSTaxes: 'pms_get_taxes';
    getPMSAccountingCategories: 'pms_get_accounting_categories';
    getPMSClosure: 'pms_get_closure';
};
