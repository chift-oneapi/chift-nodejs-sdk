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
        params?: GetCustomersParams
    ): RequestData<components['schemas']['CommerceCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
        };
    },
    getProducts(
        params?: GetProductsParams
    ): RequestData<components['schemas']['ProductItem-Output'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/products',
        };
    },
    getCustomer(customerId: string): RequestData<components['schemas']['CommerceCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/customers/${customerId}`,
        };
    },
    getProduct(productId: string): RequestData<components['schemas']['ProductItem-Output']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/products/${productId}`,
        };
    },
    getProductVariantById(variantId: string): RequestData<components['schemas']['VariantItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/variants/${variantId}`,
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
        params?: GetLocationsParams
    ): RequestData<components['schemas']['CommerceLocationItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
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
        params?: GetPaymentMethodsParams
    ): RequestData<components['schemas']['PaymentMethodItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/payment-methods`,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/product-categories`,
        };
    },
    getTaxes(params?: GetTaxesParams): RequestData<components['schemas']['TaxRateItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/taxes`,
        };
    },
    getCountries(params?: GetCountriesParams): RequestData<components['schemas']['CountryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/countries`,
        };
    },
};

export { ecommerceFactory };
