import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetFinancialInstitutionsParams = AutoPaginatedParams<
    operations['banking_get_financial_institutions']['parameters']['query']
>;

type GetAccountsParams = AutoPaginatedParams<
    operations['banking_get_accounts']['parameters']['query']
>;

type GetAccountTransactionsParams = AutoPaginatedParams<
    operations['banking_get_account_transactions']['parameters']['query']
>;

type GetAccountCounterpartsParams = AutoPaginatedParams<
    operations['banking_get_account_counterparts']['parameters']['query']
>;

const bankingFactory = {
    getFinancialInstitutions(
        params?: GetFinancialInstitutionsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['BankingFinancialInstitutionItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/financial-institutions',
            rawData,
        };
    },
    getAccounts(
        params?: GetAccountsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['BankingAccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/accounts',
            rawData,
        };
    },
    getAccountTransactions(
        accountId: string,
        params?: GetAccountTransactionsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['BankingTransactionItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/banking/${accountId}/transactions`,
            rawData,
        };
    },
    getAccountCounterparts(
        params?: GetAccountCounterpartsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['BankingCounterPartItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/counterparts',
            rawData,
        };
    },
};

export { bankingFactory };
