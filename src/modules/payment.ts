import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetBalancesParams = AutoPaginatedParams<
    operations['payment_get_balances']['parameters']['query']
>;
type GetPaymentsParams = AutoPaginatedParams<
    operations['payment_get_payments']['parameters']['query']
>;
type GetTransactionsParams = AutoPaginatedParams<
    operations['payment_get_transaction']['parameters']['query']
>;
type GetRefundsParams = AutoPaginatedParams<
    operations['payment_get_refunds']['parameters']['query']
>;

const paymentFactory = {
    getPayments(
        params: GetPaymentsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PaymentItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments`,
            rawData,
        };
    },
    getBalances(
        params: GetBalancesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['BalanceItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/balances`,
            rawData,
        };
    },
    getTransactions(
        params: GetTransactionsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['TransactionItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/transactions`,
            rawData,
        };
    },
    getPayment(
        params: operations['payment_get_payment']['parameters']['path'],
        rawData?: boolean
    ): RequestData<components['schemas']['PaymentItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments/{payment_id}`,
            rawData,
        };
    },
    getRefunds(
        params: GetRefundsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['RefundItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/refunds`,
            rawData,
        };
    },
};

export { paymentFactory };
