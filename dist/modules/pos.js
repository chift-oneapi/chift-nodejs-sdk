"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.posFactory = void 0;
const posFactory = {
    getLocations() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
        };
    },
    getOrders(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
            params: params
        };
    },
    getCustomers(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/pos/locations',
            params: params
        };
    },
    getOrder(orderId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
        };
    },
    getCustomer(customerId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/customers/${customerId}`,
        };
    },
    createCustomer(customer) {
        return {
            method: 'create',
            url: `/consumers/{consumer_id}/pos/customers`,
            body: customer
        };
    },
    getPaymentMethods(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params
        };
    },
    getSales(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/sales`,
            params: params
        };
    },
    getClosure(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params
        };
    },
    getPayments(params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/pos/payment-methods`,
            params: params
        };
    },
    updateOrder(orderId, order) {
        return {
            method: 'patch',
            url: `/consumers/{consumer_id}/pos/orders/${orderId}`,
            body: order,
        };
    },
};
exports.posFactory = posFactory;
