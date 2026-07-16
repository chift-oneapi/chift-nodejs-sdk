# Changelog

## 1.0.35 - 2026-07-15

Regenerate `src/types/public-api/schema.d.ts` from the live OpenAPI schema (`https://api.chift.eu/openapi.json`).

### Modules

-   [INVOICING] `createInvoice`: update request body type from the renamed schema `InvoiceItem-Input` to `InvoiceItemIn`. Its `invoice_type` now uses the new `InvoicingCreateInvoiceType` enum (`customer_invoice` / `customer_refund` / `supplier_invoice` / `supplier_refund`), which — unlike `InvoicingInvoiceType` — no longer includes `all`.
-   [ACCOUNTING] `getFolder`: get a single accounting folder by id.
-   [ACCOUNTING] `getPartnerContacts`: get contacts for a client or supplier partner.
-   [CONNECTIONS] `enableDatalayer`, `refreshDatalayer`, `disableDatalayer`: manage datalayer sync on a connection.
-   [PAYMENT] `getLocations`, `getPayouts`: list payment locations and payouts.
-   [PMS] `getAccountingTransactions`: list PMS accounting transactions.
-   [POS] `getTaxes`: list POS tax rates.
-   [SYNCS] `getSyncExecutions`: list executions for a sync.
-   [CONSUMER] `disableFlow`: disable a flow for a specific consumer.
-   [DATALAB] `getCubeSchemas`: list available Cube schemas.
-   [DATALAB] `queryDb`: run a Cube load query against the datalab database.
-   [LOCAL AGENTS] `getReleases`: list local agent releases for a connector.

### Schema (new endpoints)

-   [ACCOUNTING] Get Folder (`GET /consumers/{consumer_id}/accounting/folders/{folder_id}`)
-   [ACCOUNTING] Get partner contacts
-   [CONNECTIONS] Datalayer sync: enable / refresh / disable (`.../connections/{connection_id}/{enable,refresh,disable}_datalayer`)
-   [PAYMENT] Get locations, Get payouts
-   [PMS] Get accounting transactions
-   [POS] Get taxes
-   [SYNCS] Get executions for a sync (`GET /syncs/{syncid}/executions`); Disable a flow for a specific consumer (`POST /consumers/{consumer_id}/syncs/{syncid}/flows/{flowid}/disable`)
-   [DATALAB] Get cube schemas (`GET /datalab/cube-schemas`)
-   [DATALAB] Query db (`POST /datalab/query-db`)
-   [LOCAL AGENTS] Get releases (`GET /local-agents/releases`)

### Schema (type refinements)

-   `SyncSkipReason` gains `connector_feature`.
-   `PartnerType` is split into `PartnerType-Input` (`client` / `supplier`) and `PartnerType-Output` (`owner` / `account`).

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

## 1.0.25 - 2025-10-09

### Security

-   Remove `coveralls` dependency to fix critical security vulnerabilities
-   Fix 4 security vulnerabilities (2 critical, 2 moderate) in dependencies

### Invoicing

-   Add `getBankAccounts()` method to retrieve bank accounts with pagination
-   Add `getBankTransactions()` method to retrieve bank transactions with filtering by account, date range, and status
-   Add `uploadDocument()` method to upload invoice documents
-   Enhanced existing methods with new parameters: `include_invoice_lines`, `include_partner_info`, `include_payments`
-   Enhanced `getInvoiceById()` with `include_pdf` parameter support

### Accounting

-   **BREAKING**: Removed `createFinancialEntryOld` and `createJournalEntryOld` methods, use `createFinancialEntry` and `createJournalEntry` instead
-   Add `createExpense()` method for creating employee expenses
-   Add `getPaymentMethods()` method to retrieve accounting payment methods
-   Add `createInvoicePayment()` method to post invoice payments
-   Update `createJournal()` to align with new endpoint path

### POS

-   Add `getObjectives()` method to retrieve sales objectives with pagination and date filtering

### Ecommerce

-   Enhanced `getProducts()` method with new parameters: `updated_after`, `sku` for better filtering

### Schema Updates

-   Update to latest OpenAPI schema with comprehensive documentation improvements
-   Add extensive `@example` annotations for better developer experience
-   Enhanced field descriptions across all modules
-   Add new schemas: `InvoicingBankAccountItem`, `InvoicingBankTransactionItem`, `ExpenseItemIn`, `ExpenseItemOut`
-   Add new endpoints: `invoicing_get_bank_accounts`, `invoicing_get_bank_transactions`, `invoicing_upload_document`, `accounting_create_expense`, `accounting_get_payment_methods`, `accounting_create_invoice_payment`, `pos_get_objectives`

### Dependencies

-   Remove vulnerable `coveralls@3.1.1` package
-   All security vulnerabilities resolved (0 vulnerabilities found)

## 1.0.26 - 2025-10-10

-   Support marketplaceId in token

## 1.0.27 - 2026-01-21

### Breaking Changes

-   Update banking `getAccountTransactions` signature to use query params (account_id, filters)
-   Require `redirect` in connection creation payloads
-   Update ecommerce/invoicing schema type names to `backbone_common__models__*`

### Platform

-   Add Issues API (list/account/consumer detail)
-   Add transaction lookup by `client_request_id` on consumer connections

### Accounting

-   Add bank accounts listing, bank transactions creation, payment terms, schemes, and FEC export

### Banking

-   Add attachments retrieval with pagination

### PMS

-   Add taxes listing
-   Add getCustomer

### Syncs

-   Remove deprecated update sync endpoint

## 1.0.28 - 2026-02-04

-   Update module type references to match latest schema (invoicing, ecommerce, pos, consumer)

## 1.0.29 - 2026-02-10

-   [CONSUMERS] Add optional query params to getConsumers: `search` and `internal_reference`

## 1.0.30 - 2026-03-12

-   [AUTH] fix: convert token expires_on to ms and add buffer
-   [AUTH] feat: add token refresh retry

## 1.0.31 - 2026-03-12

-   [AUTH] fix: set `Content-Type: application/json` on token and internal API requests for Axios version compatibility

## 1.0.32 - 2026-03-17

-   Update model (e.g. incldue 'apis' when creating a connection)

## 1.0.33 - 2026-05-05

### Tooling

-   Require Node.js `>=22`: add `engines.node` to `package.json` and `.npmrc` with `engine-strict=true` so installs fail on unsupported Node versions; set `.nvmrc` to `22`
-   Update CI workflows (`test` and `publish`) to use Node.js `22.x`

## 1.0.34 - 2026-05-06

### Tooling

-   Drop the `axios` dependency in favour of the platform `fetch` API (Node.js `>=22`). The axios request interceptor (auth header injection, token refresh within a 30s buffer, `X-Chift-ConnectionId` / `X-Chift-IntegrationId` / `X-Chift-RelatedChainExecutionId` forwarding) is preserved inline in the new `InternalAPI.request()` method.
-   Export a new `ChiftRequestError` class (mirrors the previous `e.response.{data,status}` shape) thrown for non-2xx responses; replaces `axios.isAxiosError(e)` checks in tests.
-   Add unit tests for `InternalAPI` covering fetch usage, query-param serialization, custom headers, error mapping and the token-refresh flow (initial fetch, reuse, near-expiry refresh, 401 → credentials error, transient retries, optional `marketplaceId`/`envId` forwarding).
