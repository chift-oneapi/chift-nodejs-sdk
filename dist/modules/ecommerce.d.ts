import { operations, components } from "../types/public-api/schema";
import { RequestData } from "../types/api";
declare const ecommerceFactory: {
    getCustomers(): RequestData<(components["schemas"]["CommerceCustomerItem"])[]>;
    getProducts(): RequestData<(components["schemas"]["ProductItem"])[]>;
    getCustomer(customerId: string): RequestData<(components["schemas"]["CommerceCustomerItem"])>;
    getProduct(productId: string): RequestData<(components["schemas"]["ProductItem"])>;
    getProductVariantById(variantId: string): RequestData<(components["schemas"]["VariantItem"])>;
    updateAvailableQuantity(variantId: string, inventoryDetails: components["schemas"]["InventoryDetailsUpdate"]): RequestData<(components["schemas"]["InventoryDetailsItem"])>;
    getLocations(): RequestData<(components["schemas"]["CommerceLocationItem"])[]>;
    getOrders(params: operations["ecommerce_get_orders"]["parameters"]["query"]): RequestData<(components["schemas"]["OrderItemOut"])[]>;
    createOrder(order: components["schemas"]["OrderItemIn"]): RequestData<(components["schemas"]["OrderItemOut"])>;
    getOrder(orderId: string): RequestData<(components["schemas"]["OrderItemOut"])>;
    getInvoicesByType(invoice_type: components["schemas"]["app__routers__invoicing__InvoiceType"], params: operations["invoicing_get_invoices_by_type"]["parameters"]["query"]): RequestData<(components["schemas"]["InvoiceItem"])[]>;
    getInvoice(invoiceId: string): RequestData<(components["schemas"]["InvoiceItem"])>;
};
export { ecommerceFactory, };
