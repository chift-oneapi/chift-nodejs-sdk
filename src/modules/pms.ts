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
    getLocations(): RequestData<components['schemas']['PMSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pms/locations',
        };
    },
    getOrders(params: GetOrdersParams): RequestData<components['schemas']['PMSOrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/orders',
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams
    ): RequestData<components['schemas']['PMSPaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/payment-methods`,
        };
    },
    getClosure(
        date: string,
        params?: operations['pms_get_closure']['parameters']['query']
    ): RequestData<components['schemas']['PMSClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/closures/${date}`,
        };
    },
    getPayments(params: GetPaymentsParams): RequestData<components['schemas']['PMSPaymentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/payments`,
        };
    },
    getAccountingCategories(
        params?: GetAccountingCategoriesParams
    ): RequestData<components['schemas']['PMSAccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pms/accounting-categories`,
        };
    },
    getCustomers(
        params?: GetCustomersParams
    ): RequestData<components['schemas']['PMSCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/customers',
        };
    },
    getInvoices(
        params?: GetInvoicesParams
    ): RequestData<components['schemas']['PMSInvoiceFullItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pms/invoices',
        };
    },
};

export { pmsFactory };
