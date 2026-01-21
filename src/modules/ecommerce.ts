import { operations, components } from '../types/public-api/schema';
import { AutoPaginatedParams, RequestData, RawDataOption, ClientRequestOption } from '../types/api';

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
        options?: RawDataOption
    ): RequestData<components['schemas']['CommerceCustomerItem'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
            rawData: options?.rawData,
        };
    },
    getProducts(
        params?: GetProductsParams,
        options?: RawDataOption
    ): RequestData<
        components['schemas']['backbone_common__models__commerce__common__ProductItem'][]
    > {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/products',
            rawData: options?.rawData,
        };
    },
    getCustomer(
        customerId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['CommerceCustomerItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/customers/${customerId}`,
            rawData: options?.rawData,
        };
    },
    getProduct(
        productId: string,
        options?: RawDataOption
    ): RequestData<
        components['schemas']['backbone_common__models__commerce__common__ProductItem']
    > {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/products/${productId}`,
            rawData: options?.rawData,
        };
    },
    getProductVariantById(
        variantId: string,
        options?: RawDataOption
    ): RequestData<components['schemas']['VariantItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/variants/${variantId}`,
            rawData: options?.rawData,
        };
    },
    updateAvailableQuantity(
        variantId: string,
        inventoryDetails: components['schemas']['InventoryDetailsUpdate'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['InventoryDetailsItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/variants/set_quantity/${variantId}`,
            body: inventoryDetails,
            clientRequestId: options?.clientRequestId,
        };
    },
    getLocations(
        params?: GetLocationsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['CommerceLocationItemOut'][]> {
        return {
            params,
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
            rawData: options?.rawData,
        };
    },
    getOrders(
        params?: GetOrdersParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['OrderItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/orders',
            params: params,
            rawData: options?.rawData,
        };
    },
    createOrder(
        order: components['schemas']['OrderItemIn'],
        options?: ClientRequestOption
    ): RequestData<components['schemas']['OrderItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/orders`,
            body: order,
            clientRequestId: options?.clientRequestId,
        };
    },
    getOrder(
        orderId: string,
        params?: operations['ecommerce_get_order']['parameters']['query'],
        options?: RawDataOption
    ): RequestData<components['schemas']['OrderItemOut']> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/orders/${orderId}`,
            rawData: options?.rawData,
        };
    },
    getPaymentMethods(
        params?: GetPaymentMethodsParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['PaymentMethodItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/payment-methods`,
            rawData: options?.rawData,
        };
    },
    getProductCategories(
        params?: GetProductCategoriesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/product-categories`,
            rawData: options?.rawData,
        };
    },
    getTaxes(
        params?: GetTaxesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['TaxRateItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/taxes`,
            rawData: options?.rawData,
        };
    },
    getCountries(
        params?: GetCountriesParams,
        options?: RawDataOption
    ): RequestData<components['schemas']['CountryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/countries`,
            rawData: options?.rawData,
        };
    },
};

export { ecommerceFactory };
