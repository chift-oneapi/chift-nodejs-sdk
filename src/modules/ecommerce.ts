import { operations, components } from "../types/public-api/schema";
import { RequestData } from "../types/api";

const ecommerceFactory = {
    getCustomers(): RequestData<(components["schemas"]["CommerceCustomerItem"])[]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/customers',
        }
    },
    getProducts(): RequestData<(components["schemas"]["ProductItem"])[]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/products',
        }
    },
    getCustomer(customerId: string): RequestData<(components["schemas"]["CommerceCustomerItem"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/customers/${customerId}`,
        }
    },
    getProduct(productId: string): RequestData<(components["schemas"]["ProductItem"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/products/${productId}`,
        }
    },
    getProductVariantById(variantId: string): RequestData<(components["schemas"]["VariantItem"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/variants/${variantId}`,
        }
    },
    updateAvailableQuantity(variantId: string, inventoryDetails: components["schemas"]["InventoryDetailsUpdate"]): RequestData<(components["schemas"]["InventoryDetailsItem"])> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/variants/set_quantity/${variantId}`,
            body: inventoryDetails
        }
    },
    getLocations(): RequestData<(components["schemas"]["CommerceLocationItem"])[]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/locations',
        }
    },
    getOrders(params: operations["ecommerce_get_orders"]["parameters"]["query"]): RequestData<(components["schemas"]["OrderItemOut"])[]> {
        return {
            method: 'get',
            url: '/consumers/{consumer_id}/commerce/orders',
            params: params
        }
    },
    createOrder(order: components["schemas"]["OrderItemIn"]): RequestData<(components["schemas"]["OrderItemOut"])> {
        return {
            method: 'post',
            url: `/consumers/{consumer_id}/commerce/orders`,
            body: order
        }
    },
    getOrder(orderId: string): RequestData<(components["schemas"]["OrderItemOut"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/commerce/orders/${orderId}`,
        }
    },
    getInvoicesByType(invoice_type: components["schemas"]["app__routers__invoicing__InvoiceType"], params: operations["invoicing_get_invoices_by_type"]["parameters"]["query"]): RequestData<(components["schemas"]["InvoiceItem"])[]> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/type/${invoice_type}`,
            params: params
        }
    },
    getInvoice(invoiceId: string): RequestData<(components["schemas"]["InvoiceItem"])> {
        return {
            method: 'get',
            url: `/consumers/{consumer_id}/invoicing/invoices/${invoiceId}`,
        }
    },
}

export {
    ecommerceFactory,
}