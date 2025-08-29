import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData } from '../types/api';

type GetOrdersParams = AutoPaginatedParams<
    operations['ecommerce_get_orders']['parameters']['query']
>;

type GetPaymentMethodsParams = AutoPaginatedParams<
    operations['ecommerce_get_payments_methods']['parameters']['query']
>;

type GetProductCategoriesParams = AutoPaginatedParams<
    operations['ecommerce_get_product_categories']['parameters']['query']
>;

type GetTaxesParams = AutoPaginatedParams<operations['ecommerce_get_taxes']['parameters']['query']>;

type GetCountriesParams = AutoPaginatedParams<
    operations['ecommerce_get_countries']['parameters']['query']
>;

type GetCustomersParams = AutoPaginatedParams<
    operations['ecommerce_get_customers']['parameters']['query']
>;

type GetProductsParams = AutoPaginatedParams<
    operations['ecommerce_get_products']['parameters']['query']
>;

type GetLocationsParams = AutoPaginatedParams<
    operations['ecommerce_get_locations']['parameters']['query']
>;

const ecommerceFactory = {
    getCustomers(
        params?: GetCustomersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['CommerceCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
            rawData,
        };
    },
    getProducts(
        params?: GetProductsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['ProductItem-Output'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/products',
            rawData,
        };
    },
    getCustomer(
        customerId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['CommerceCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/customers/${customerId}`,
            rawData,
        };
    },
    getProduct(
        productId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['ProductItem-Output']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/products/${productId}`,
            rawData,
        };
    },
    getProductVariantById(
        variantId: string,
        rawData?: boolean
    ): RequestData<components['schemas']['VariantItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/variants/${variantId}`,
            rawData,
        };
    },
    updateAvailableQuantity(
        variantId: string,
        inventoryDetails: components['schemas']['InventoryDetailsUpdate'],
        clientRequestId?: string
    ): RequestData<components['schemas']['InventoryDetailsItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/variants/set_quantity/${variantId}`,
            body: inventoryDetails,
            clientRequestId,
        };
    },
    getLocations(
        params?: GetLocationsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['CommerceLocationItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
            rawData,
        };
    },
    getOrders(
        params?: GetOrdersParams,
        rawData?: boolean
    ): RequestData<components['schemas']['OrderItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/orders',
            params: params,
            rawData,
        };
    },
    createOrder(
        order: components['schemas']['OrderItemIn'],
        clientRequestId?: string
    ): RequestData<components['schemas']['OrderItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/orders`,
            body: order,
            clientRequestId,
        };
    },
    getOrder(
        orderId: string,
        params?: operations['ecommerce_get_order']['parameters']['query'],
        rawData?: boolean
    ): RequestData<components['schemas']['OrderItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/orders/${orderId}`,
            rawData,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams,
        rawData?: boolean
    ): RequestData<components['schemas']['PaymentMethodItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/payment-methods`,
            rawData,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/product-categories`,
            rawData,
        };
    },
    getTaxes(
        params?: GetTaxesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['TaxRateItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/taxes`,
            rawData,
        };
    },
    getCountries(
        params?: GetCountriesParams,
        rawData?: boolean
    ): RequestData<components['schemas']['CountryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/countries`,
            rawData,
        };
    },
};

export { ecommerceFactory };
