import { operations, components } from '../types/public-api/schema';
import { RequestData } from '../types/api';

type getOrdersParams = Omit<
    operations['ecommerce_get_orders']['parameters']['query'],
    'page' | 'size'
>;

type getPaymentMethodsParams = Omit<
    operations['ecommerce_get_payments_methods']['parameters']['query'],
    'page' | 'size'
>;

type getProductCategoriesParams = Omit<
    operations['ecommerce_get_product_categories']['parameters']['query'],
    'page' | 'size'
>;

type getTaxesParams = Omit<
    operations['ecommerce_get_taxes']['parameters']['query'],
    'page' | 'size'
>;

type getCountriesParams = Omit<
    operations['ecommerce_get_countries']['parameters']['query'],
    'page' | 'size'
>;

const ecommerceFactory = {
    getCustomers(): RequestData<components['schemas']['CommerceCustomerItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
        };
    },
    getProducts(): RequestData<components['schemas']['app__routers__commerce__ProductItem'][]> {
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
    ): RequestData<components['schemas']['app__routers__commerce__ProductItem']> {
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
    getOrders(params: getOrdersParams): RequestData<components['schemas']['OrderItemOut'][]> {
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
        params: getPaymentMethodsParams
    ): RequestData<components['schemas']['PaymentMethodItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/payment-methods`,
        };
    },
    getProductCategories(
        params: getProductCategoriesParams
    ): RequestData<components['schemas']['CategoryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/product-categories`,
        };
    },
    getTaxes(params: getTaxesParams): RequestData<components['schemas']['TaxRateItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/taxes`,
        };
    },
    getCountries(params: getCountriesParams): RequestData<components['schemas']['CountryItem'][]> {
        return {
            params,
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/countries`,
        };
    },
};

export { ecommerceFactory };
