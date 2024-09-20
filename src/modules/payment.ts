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
    getPayments(params: GetPaymentsParams): RequestData<components['schemas']['PaymentItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments`,
        };
    },
    getBalances(params: GetBalancesParams): RequestData<components['schemas']['BalanceItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/balances`,
        };
    },
    getTransactions(
        params: GetTransactionsParams
    ): RequestData<components['schemas']['TransactionItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/transactions`,
        };
    },
    getPayment(
        params: operations['payment_get_payment']['parameters']['path']
    ): RequestData<components['schemas']['PaymentItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments/{payment_id}`,
        };
    },
    getRefunds(params: GetRefundsParams): RequestData<components['schemas']['RefundItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/refunds`,
        };
    },
};

export { paymentFactory };
