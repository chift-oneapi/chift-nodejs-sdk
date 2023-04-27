import { operations, components } from '../types/public-api/schema';
import { RequestData } from '../types/api';

const posFactory = {
    getLocations(): RequestData<components['schemas']['POSLocationItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
        };
    },
    getOrders(
        params: operations['pos_get_orders']['parameters']['query']
    ): RequestData<components['schemas']['OrderItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/orders',
            params: params,
        };
    },
    getCustomers(
        params: operations['pos_get_customers']['parameters']['query']
    ): RequestData<components['schemas']['POSCustomerItem'][]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/customers',
            params: params,
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
        params: operations['pos_get_payments_methods']['parameters']['query']
    ): RequestData<components['schemas']['PaymentMethods'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params,
        };
    },
    getSales(
        params: operations['pos_get_sales']['parameters']['query']
    ): RequestData<components['schemas']['SalesItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/sales`,
            params: params,
        };
    },
    getClosure(
        params: operations['pos_get_closure']['parameters']['query']
    ): RequestData<components['schemas']['ClosureItem']> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params,
        };
    },
    getPayments(
        params: operations['pos_get_payments']['parameters']['query']
    ): RequestData<components['schemas']['PaymentItem'][]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params,
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
};

export { posFactory };
