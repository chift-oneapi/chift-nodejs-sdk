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
    getLocations(): RequestData<components['schemas']['POSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
        };
    },
    getOrders(params: GetOrdersParams): RequestData<components['schemas']['OrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/orders',
        };
    },
    getCustomers(
        params?: GetCustomersParams
    ): RequestData<components['schemas']['POSCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/customers',
        };
    },
    getOrder(orderId: string): RequestData<components['schemas']['OrderItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
        };
    },
    getCustomer(customerId: string): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/customers/${customerId}`,
        };
    },
    createCustomer(
        customer: components['schemas']['POSCreateCustomerItem']
    ): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/pos/customers`,
            body: customer,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams
    ): RequestData<components['schemas']['PaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/product-categories`,
        };
    },
    getProducts(
        params?: GetProductsParams
    ): RequestData<components['schemas']['POSProductItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/products`,
        };
    },
    getSales(
        params: operations['pos_get_sales']['parameters']['query']
    ): RequestData<components['schemas']['SalesItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/sales`,
        };
    },
    getClosure(
        date: string,
        params?: operations['pos_get_closure']['parameters']['query']
    ): RequestData<components['schemas']['ClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/closures/${date}`,
        };
    },
    getPayments(params: GetPaymentsParams): RequestData<components['schemas']['PaymentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payments`,
        };
    },
    updateOrder(
        orderId: string,
        order: components['schemas']['UpdateOrderItem']
    ): RequestData<components['schemas']['OrderItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            body: order,
        };
    },
    getAccountingCategories(
        params?: GetAccountingCategoriesParams
    ): RequestData<components['schemas']['AccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/accounting-categories`,
        };
    },
};

export { posFactory };
