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
