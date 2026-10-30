import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption, ClientRequestOption } from '../types/api';

type GetLedgerAccountsParams = AutoPaginatedParams<
    operations['spend_management_get_ledger_accounts']['parameters']['query']
>;

type GetTaxCodesParams = AutoPaginatedParams<
    operations['spend_management_get_tax_codes']['parameters']['query']
>;

type GetAnalyticalPlansParams = AutoPaginatedParams<
    operations['spend_management_get_analytical_plans']['parameters']['query']
>;

type GetAnalyticAccountsParams = AutoPaginatedParams<
    operations['spend_management_get_analytic_accounts']['parameters']['query']
>;

type GetPayablesParams = AutoPaginatedParams<
    operations['spend_management_get_payables']['parameters']['query']
>;

type GetFinancialMovementsParams = AutoPaginatedParams<
    operations['spend_management_get_financial_movements']['parameters']['query']
>;

type GetSuppliersParams = AutoPaginatedParams<
    operations['spend_management_get_suppliers']['parameters']['query']
>;

type GetEmployeesParams = AutoPaginatedParams<
    operations['spend_management_get_employees']['parameters']['query']
>;

const spendManagementFactory = {
    getLegalEntities(
        options?: RawDataOption
    ): RequestData<components['schemas']['LegalEntityItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/legal-entities',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getLedgerAccounts(
        params?: GetLedgerAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['SpendManagementAccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/ledger-accounts',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createLedgerAccount(
        ledgerAccount: components['schemas']['LedgerAccountItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementAccountItem']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/spend_management/ledger-accounts',
            body: ledgerAccount,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    updateLedgerAccount(
        ledgerAccountId: string,
        ledgerAccount: components['schemas']['LedgerAccountItemUpdate'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementAccountItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/ledger-accounts/${ledgerAccountId}`,
            body: ledgerAccount,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getTaxCodes(
        params?: GetTaxCodesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['TaxCodeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/tax-codes',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createTaxCode(
        taxCode: components['schemas']['TaxCodeItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['TaxCodeItem']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/spend_management/tax-codes',
            body: taxCode,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    updateTaxCode(
        taxCodeId: string,
        taxCode: components['schemas']['TaxCodeItemUpdate'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['TaxCodeItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/tax-codes/${taxCodeId}`,
            body: taxCode,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getAnalyticalPlans(
        params?: GetAnalyticalPlansParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AnalyticPlanItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/analytical-plans',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createAnalyticalPlan(
        analyticalPlan: components['schemas']['AnalyticPlanItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AnalyticPlanItem']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/spend_management/analytical-plans',
            body: analyticalPlan,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    updateAnalyticalPlan(
        analyticalPlanId: string,
        analyticalPlan: components['schemas']['AnalyticPlanItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['AnalyticPlanItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/analytical-plans/${analyticalPlanId}`,
            body: analyticalPlan,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getAnalyticAccounts(
        params?: GetAnalyticAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['SpendManagementAnalyticAccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/analytic-accounts',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getAnalyticAccount(
        analyticAccountId: string,
        analyticPlan: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['SpendManagementAnalyticAccountItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/spend_management/analytic-accounts/${analyticAccountId}/analytic-plans/${analyticPlan}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createAnalyticAccount(
        analyticPlan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementAnalyticAccountItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/spend_management/analytic-accounts/analytic-plans/${analyticPlan}`,
            body: analyticAccount,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    updateAnalyticAccount(
        analyticAccountId: string,
        analyticPlan: string,
        analyticAccount: components['schemas']['AnalyticAccountItemUpdate'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementAnalyticAccountItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/analytic-accounts/${analyticAccountId}/analytic-plans/${analyticPlan}`,
            body: analyticAccount,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getPayables(
        params: GetPayablesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PayableItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/payables',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getPayable(
        payableId: string,
        params?: operations['spend_management_get_payable']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['PayableItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/spend_management/payables/${payableId}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    markPayableAsExported(
        payableId: string,
        options?: ClientRequestOption
    ): RequestData<components['schemas']['PayableItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/payables/${payableId}/mark-as-exported`,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getFinancialMovements(
        params?: GetFinancialMovementsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['FinancialMovementItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/financial-movements',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    markFinancialMovementAsExported(
        financialMovementId: string,
        options?: ClientRequestOption
    ): RequestData<components['schemas']['FinancialMovementItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/financial-movements/${financialMovementId}/mark-as-exported`,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getSuppliers(
        params?: GetSuppliersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['SpendManagementSupplierItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/suppliers',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getSupplier(
        supplierId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['SpendManagementSupplierItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/spend_management/suppliers/${supplierId}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createSupplier(
        supplier: components['schemas']['SpendManagementSupplierItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementSupplierItemOut']> {
        return {
            method: 'post',
            url: '/consumers/{consumer_id}/spend_management/suppliers',
            body: supplier,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    updateSupplier(
        supplierId: string,
        supplier: components['schemas']['SpendManagementSupplierItemUpdate'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['SpendManagementSupplierItemOut']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/spend_management/suppliers/${supplierId}`,
            body: supplier,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getEmployees(
        params?: GetEmployeesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['EmployeeItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/spend_management/employees',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
};

export { spendManagementFactory };
