"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ecommerceFactory = void 0;
const ecommerceFactory = {
    getCustomers() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
        };
    },
    getProducts() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/products',
        };
    },
    getCustomer(customerId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/customers/${customerId}`,
        };
    },
    getProduct(productId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/products/${productId}`,
        };
    },
    getProductVariantById(variantId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/variants/${variantId}`,
        };
    },
    updateAvailableQuantity(variantId, inventoryDetails) {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/variants/set_quantity/${variantId}`,
            body: inventoryDetails
        };
    },
    getLocations() {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
        };
    },
    getOrders(params) {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/orders',
            params: params
        };
    },
    createOrder(order) {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/orders`,
            body: order
        };
    },
    getOrder(orderId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/orders/${orderId}`,
        };
    },
    getInvoicesByType(invoice_type, params) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
            params: params
        };
    },
    getInvoice(invoiceId) {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
        };
    },
};
exports.ecommerceFactory = ecommerceFactory;
