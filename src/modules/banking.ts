import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption } from '../types/api';

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

type GetAttachmentsParams = AutoPaginatedParams<
    operations['banking_get_attachments']['parameters']['query']
>;

const bankingFactory = {
    getFinancialInstitutions(
        params?: GetFinancialInstitutionsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BankingFinancialInstitutionItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/financial-institutions',
            rawData: options?.rawData,
        };
    },
    getAccounts(
        params?: GetAccountsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BankingAccountItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/accounts',
            rawData: options?.rawData,
        };
    },
    getAccountTransactions(
        params: GetAccountTransactionsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BankingTransactionItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/banking/transactions`,
            rawData: options?.rawData,
        };
    },
    getAccountCounterparts(
        params?: GetAccountCounterpartsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BankingCounterPartItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/counterparts',
            rawData: options?.rawData,
        };
    },
    getAttachments(
        params: GetAttachmentsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ChiftPage_AttachmentItemOut_']> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/banking/attachments',
            rawData: options?.rawData,
        };
    },
};

export { bankingFactory };
