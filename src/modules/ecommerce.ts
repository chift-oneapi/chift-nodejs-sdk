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

const ecommerceFactory = {
    getCustomers(): RequestData<components['schemas']['CommerceCustomerItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
        };
    },
    getProducts(): RequestData<
        components['schemas']['backbone_common__models__commerce__common__ProductItem'][]
    > {
        return {
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
    getProduct(
        productId: string
    ): RequestData<
        components['schemas']['backbone_common__models__commerce__common__ProductItem']
    > {
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
        inventoryDetails: components['schemas']['InventoryDetailsUpdate']
    ): RequestData<components['schemas']['InventoryDetailsItem']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/variants/set_quantity/${variantId}`,
            body: inventoryDetails,
        };
    },
    getLocations(): RequestData<components['schemas']['CommerceLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
        };
    },
    getOrders(params?: GetOrdersParams): RequestData<components['schemas']['OrderItemOut'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/orders',
            params: params,
        };
    },
    createOrder(
        order: components['schemas']['OrderItemIn']
    ): RequestData<components['schemas']['OrderItemOut']> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/orders`,
            body: order,
        };
    },
    getOrder(orderId: string): RequestData<components['schemas']['OrderItemOut']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/orders/${orderId}`,
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
