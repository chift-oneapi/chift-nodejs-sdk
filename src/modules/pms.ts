import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetPaymentsParams = AutoPaginatedParams<operations['pms_get_payments']['parameters']['query']>;

type GetPaymentMethodsParams = AutoPaginatedParams<
    operations['pms_get_payments_methods']['parameters']['query']
>;

type GetAccountingCategoriesParams = AutoPaginatedParams<
    operations['pms_get_accounting_categories']['parameters']['query']
>;

type GetOrdersParams = AutoPaginatedParams<operations['pms_get_orders']['parameters']['query']>;

type GetCustomersParams = AutoPaginatedParams<
    operations['pms_get_customers']['parameters']['query']
>;
type GetInvoicesParams = AutoPaginatedParams<operations['pms_get_invoices']['parameters']['query']>;

const pmsFactory = {
    getLocations(rawData?: boolean): RequestData<components['schemas']['PMSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pms/locations',
            rawData,
        };
    },
    getOrders(
        params: GetOrdersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSOrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/orders',
            rawData,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSPaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/payment-methods`,
            rawData,
        };
    },
    getClosure(
        date: string,
        params?: operations['pms_get_closure']['parameters']['query'],
        rawData?: boolean
    ): RequestData<components['schemas']['PMSClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/closures/${date}`,
            rawData,
        };
    },
    getPayments(
        params: GetPaymentsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSPaymentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/payments`,
            rawData,
        };
    },
    getAccountingCategories(
        params?: GetAccountingCategoriesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSAccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/accounting-categories`,
            rawData,
        };
    },
    getCustomers(
        params?: GetCustomersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/customers',
            rawData,
        };
    },
    getInvoices(
        params?: GetInvoicesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PMSInvoiceFullItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/invoices',
            rawData,
        };
    },
};

export { pmsFactory };
