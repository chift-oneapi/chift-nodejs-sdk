import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption } from '../types/api';

type GetBalancesParams = AutoPaginatedParams<
    operations['payment_get_balances']['parameters']['query']
>;
type GetPaymentsParams = AutoPaginatedParams<
    operations['payment_get_payments']['parameters']['query']
>;
type GetTransactionsParams = AutoPaginatedParams<
    operations['payment_get_transactions']['parameters']['query']
>;
type GetRefundsParams = AutoPaginatedParams<
    operations['payment_get_refunds']['parameters']['query']
>;
type GetLocationsParams = AutoPaginatedParams<
    operations['payment_get_locations']['parameters']['query']
>;
type GetPayoutsParams = AutoPaginatedParams<
    operations['payment_get_payouts']['parameters']['query']
>;

const paymentFactory = {
    getPayments(
        params: GetPaymentsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PaymentItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getBalances(
        params: GetBalancesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['BalanceItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/balances`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getTransactions(
        params: GetTransactionsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['TransactionItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/transactions`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getPayment(
        params: operations['payment_get_payment']['parameters']['path'],
        options?: RawDataOption
    ): RequestData<components['schemas']['PaymentItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payments/{payment_id}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getRefunds(
        params: GetRefundsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['RefundItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/refunds`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getLocations(
        params?: GetLocationsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PaymentLocationItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/locations`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getPayouts(
        params?: GetPayoutsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PayoutItemOut'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/payment/payouts`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
};

export { paymentFactory };
