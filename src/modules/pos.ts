import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetPaymentsParams = AutoPaginatedParams<operations['pos_get_payments']['parameters']['query']>;

type GetPaymentMethodsParams = AutoPaginatedParams<
    operations['pos_get_payments_methods']['parameters']['query']
>;

type GetProductCategoriesParams = AutoPaginatedParams<
    operations['pos_get_product_categories']['parameters']['query']
>;

type GetProductsParams = AutoPaginatedParams<operations['pos_get_products']['parameters']['query']>;

type GetCustomersParams = AutoPaginatedParams<
    operations['pos_get_customers']['parameters']['query']
>;

type GetAccountingCategoriesParams = AutoPaginatedParams<
    operations['pos_get_accounting_categories']['parameters']['query']
>;

type GetOrdersParams = AutoPaginatedParams<operations['pos_get_orders']['parameters']['query']>;

const posFactory = {
    getLocations(rawData?: boolean): RequestData<components['schemas']['POSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
            rawData,
        };
    },
    getOrders(
        params: GetOrdersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['POSOrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/orders',
            rawData,
        };
    },
    getCustomers(
        params?: GetCustomersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['POSCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/customers',
            rawData,
        };
    },
    getOrder(
        orderId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['POSOrderItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            rawData,
        };
    },
    getCustomer(
        customerId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/customers/${customerId}`,
            rawData,
        };
    },
    createCustomer(
        customer: components['schemas']['POSCreateCustomerItem'],
        clientRequestId?: string
    ): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/pos/customers`,
            body: customer,
            clientRequestId,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            rawData,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams,
        rawData?: boolean
    ): RequestData<
        components['schemas']['backbone_common__models__pos__common__ProductCategoryItem'][]
    > {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/product-categories`,
            rawData,
        };
    },
    getProducts(
        params?: GetProductsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['POSProductItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/products`,
            rawData,
        };
    },
    getSales(
        params: operations['pos_get_sales']['parameters']['query'],
        rawData?: boolean
    ): RequestData<components['schemas']['SalesItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/sales`,
            rawData,
        };
    },
    getClosure(
        date: string,
        params?: operations['pos_get_closure']['parameters']['query'],
        rawData?: boolean
    ): RequestData<components['schemas']['ClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/closures/${date}`,
            rawData,
        };
    },
    getPayments(
        params: GetPaymentsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['POSPaymentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payments`,
            rawData,
        };
    },
    updateOrder(
        orderId: string,
        order: components['schemas']['UpdateOrderItem'],
        clientRequestId?: string
    ): RequestData<components['schemas']['POSOrderItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            body: order,
            clientRequestId,
        };
    },
    getAccountingCategories(
        params?: GetAccountingCategoriesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['AccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/accounting-categories`,
            rawData,
        };
    },
};

export { posFactory };
