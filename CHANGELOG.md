# Changelog

## 1.0.0 - 2023-09-14

-   First release with scopes of the 5 unified APIs (Accounting, POS, eCommerce, Invoicing & Payment) of Chift and the management of consumers, connections & webhooks.
-   Review of tests and CI-pipeline

## 1.0.1 - 2023-09-21

-   Update accounting model
-   add getOutstandings route

## 1.0.2 - 2023-10-02

-   add createFinancialEntry params
-   add createJournalEntry route

## 1.0.3 - 2023-10-09

-   fix missing accounting model definitions

## 1.0.4 - 2023-10-18

-   Update createFinancialEntry endpoint
-   Deprecate previous createFinancialEntry endpoint (changed to createFinancialEntryOld)

## 1.0.5 - 2023-10-26

-   Return correct error on authentication (promise)

## 1.0.6 - 2023-11-24

-   Update models & add new POS Routes

## 1.0.7 - 2024-03-26

-   [ACCOUNTING] Remove getAnalyticLinesOfAccount
-   [ACCOUNTING] Deprecate/Replace Create Journal Entry
-   [ACCOUNTING] Update create misc operation params
-   [ACCOUNTING] Update get misc operation params
-   [ACCOUNTING] Update get balance of accounts params
-   [ACCOUNTING] Update get employees params
-   [POS] Add getAccountingCategories
-   [POS] Fix getProductCategories type
-   [ECOMMERCE] Add getPaymentMethods
-   [ECOMMERCE] Add getProductCategories
-   [ECOMMERCE] Add getCountries
-   [ECOMMERCE] Add getTaxes
-   [SYNC] Add create sync
-   [SYNC] Add update sync
-   [CONSUMER] Add enable consumer flow

## 1.0.8 - 2024-04-04

-   [ACCOUNTING] Add params to getAnalyticPlans
-   [ACCOUNTING] Add params to getClients
-   [ACCOUNTING] Add params to getClient
-   [ACCOUNTING] Add params to updateClient
-   [ACCOUNTING] Add params to getSuppliers
-   [ACCOUNTING] Add params to getSupplier
-   [ACCOUNTING] Add params to updateSupplier
-   [ACCOUNTING] Add params to createAnalyticAccount
-   [ACCOUNTING] Add params to getAnalyticAccounts
-   [ACCOUNTING] Add params to createAnalyticAccountWithMultiplePlans
-   [ACCOUNTING] Add params to getAnalyticAccount
-   [ACCOUNTING] Add params to updateAnalyticAccount
-   [ACCOUNTING] Add params to getAnalyticAccountWithMultiplePlans
-   [ACCOUNTING] Add params to getAnalyticAccountsWithMultiplePlans
-   [ACCOUNTING] Add params to updateAnalyticAccountWithMultiplePlans
-   [ACCOUNTING] Add params to getPaymentsByInvoiceId
-   [ACCOUNTING] Add params to getJournals
-   [ACCOUNTING] Add params to getVatCodes
-   [ACCOUNTING] Add route getAttachments
-   [ACCOUNTING] Add route matchEntries
-   [ACCOUNTING] Add route getFolders

## 1.0.9 - 2024-04-10

-   Add getIntegrations params

## 1.0.12 - 2024-04-29

-   Remove pagination from route params as it is handled by the library
-   Make route params optional when they are not required

## 1.0.13 - 2024-05-07

-   Add X-Chift-ConnectionId header
-   Add X-Chift-IntegrationId header

## 1.0.14 - 2024-05-21

-   Enhance auto-pagination

## 1.0.15 - 2024-05-23

-   Support PMS vertical

## 1.0.16 - 2024-05-31

-   Update model - Get integrations

## 1.0.17 - 2024-09-20

-   Update models
-   Add payment API
-   Add payment API tests
-   Add PMS API tests

## 1.0.18 - 2024-09-24

-   Fix missing type declarations

## 1.0.21 - 2025-02-19

### Accounting

-   matchEntriesMultiple
-   getBookyears

### Consumer

-   updateConsumer
-   updateFlowConfig

### Datastores

-   getConsumerDataStoreData
-   createConsumerDataStoreData
-   updateConsumerDataStoreData
-   deleteConsumerDataStoreData

### Flow

-   getConsumerExecutions

### Integrations

-   getIntegrationLogo

### Invoicing

-   getPayments
-   getPaymentMethods

### PMS

-   getCustomers
-   getInvoices

### Sync

-   sendCustomEvent
-   getConsumerExecutions
-   getExecution

### Syncs

-   sendCustomEvent
-   getConsumerExecutions
-   getExecution

## 1.0.22 - 2025-02-20

-   Fix createFinancialEntry return type

## 1.0.23 - 2025-02-28

-   Add createLedgerAccount
-   Add getJournalEntry
-   Improve tests typing

## 1.0.24 - 2025-06-26
-   Add support for `x-chift-client-requestid` header for idempotency on create/update requests
-   Add `clientRequestId` parameter to create and update methods across all modules (accounting, ecommerce, invoicing, pos)
-   Fix `invoicing.getInvoiceById()` return type to include `pdf` field when `include_pdf: 'true'` parameter is used
-   Add support for `x-chift-raw-data` header to get raw data from the API
-   Add `rawData` parameter to key methods: `getInvoicesByType()`, `getInvoice()`, `getOrders()`, `getOrder()`, `getAccountTransactions()`
-   Add banking module with comprehensive operations: getFinancialInstitutions, getAccounts, getAccountTransactions, getAccountCounterparts
-   Add 2 new create operations: createBankAccount, createJournal
-   Expand operation mappings from ~20 to 150+ operations
-   Fix schema type references for updated OpenAPI schema
