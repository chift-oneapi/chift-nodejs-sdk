import { operations, components } from '../types/public-api/schema';
import { RequestData } from '../types/api';

type getPaymentsParams = Omit<
    operations['pos_get_payments']['parameters']['query'],
    'page' | 'size'
>;

type getPaymentMethodsParams = Omit<
    operations['pos_get_payments_methods']['parameters']['query'],
    'page' | 'size'
>;

type getProductCategoriesParams = Omit<
    operations['pos_get_product_categories']['parameters']['query'],
    'page' | 'size'
>;

type getProductsParams = Omit<
    operations['pos_get_products']['parameters']['query'],
    'page' | 'size'
>;

type getCustomersParams = Omit<
    operations['pos_get_customers']['parameters']['query'],
    'page' | 'size'
>;

type getAccountingCategoriesParams = Omit<
    operations['pos_get_accounting_categories']['parameters']['query'],
    'page' | 'size'
>;

type getOrdersParams = Omit<operations['pos_get_orders']['parameters']['query'], 'page' | 'size'>;

const posFactory = {
    getLocations(): RequestData<components['schemas']['POSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
        };
    },
    getOrders(params: getOrdersParams): RequestData<components['schemas']['OrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/orders',
        };
    },
    getCustomers(
        params: getCustomersParams
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
        params: getPaymentMethodsParams
    ): RequestData<components['schemas']['PaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
        };
    },
    getProductCategories(
        params: getProductCategoriesParams
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/product-categories`,
        };
    },
    getProducts(params: getProductsParams): RequestData<components['schemas']['POSProductItem'][]> {
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
        params: operations['pos_get_closure']['parameters']['query']
    ): RequestData<components['schemas']['ClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/closures/${date}`,
        };
    },
    getPayments(params: getPaymentsParams): RequestData<components['schemas']['PaymentItem'][]> {
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
        params: getAccountingCategoriesParams
    ): RequestData<components['schemas']['AccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/accounting-categories`,
        };
    },
};

export { posFactory };
