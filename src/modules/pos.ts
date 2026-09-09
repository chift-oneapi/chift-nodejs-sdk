import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption, ClientRequestOption } from '../types/api';

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

type GetModifiersParams = AutoPaginatedParams<
    operations['pos_get_modifiers']['parameters']['query']
>;

type GetTaxesParams = AutoPaginatedParams<operations['pos_get_taxes']['parameters']['query']>;

const posFactory = {
    getLocations(options?: RawDataOption): RequestData<components['schemas']['POSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getOrders(
        params: GetOrdersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSOrderItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/orders',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getCustomers(
        params?: GetCustomersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/pos/customers',
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getOrder(
        orderId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSOrderItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getCustomer(
        customerId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/customers/${customerId}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    createCustomer(
        customer: components['schemas']['POSCreateCustomerItem'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['POSCustomerItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/pos/customers`,
            body: customer,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PaymentMethods'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ProductCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/product-categories`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getProducts(
        params?: GetProductsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSProductItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/products`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getSales(
        params: operations['pos_get_sales']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['SalesItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/sales`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getClosure(
        date: string,
        params?: operations['pos_get_closure']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['ClosureItem']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/closures/${date}`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getPayments(
        params: GetPaymentsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSPaymentItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payments`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    updateOrder(
        orderId: string,
        order: components['schemas']['UpdateOrderItem'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['POSOrderItem']> {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            body: order,
            clientRequestId: options?.clientRequestId,
            datalayer: options?.datalayer,
        };
    },
    getAccountingCategories(
        params?: GetAccountingCategoriesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['AccountingCategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/accounting-categories`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getObjectives(
        params: operations['pos_get_objectives']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['ChiftPage_ObjectivesItem_']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/objectives`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getModifiers(
        params?: GetModifiersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['ModifiersItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/modifiers`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
    getTaxes(
        params?: GetTaxesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['POSTaxRateItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/pos/tax-rates`,
            rawData: options?.rawData,
            datalayer: options?.datalayer,
        };
    },
};

export { posFactory };
