import { operations, components } from "../types/public-api/schema";
import { RequestData } from "../types/api";
declare const posFactory: {
    getLocations(): RequestData<(components["schemas"]["POSLocationItem"])[]>;
    getOrders(params: operations["pos_get_orders"]["parameters"]["query"]): RequestData<(components["schemas"]["OrderItem"])[]>;
    getCustomers(params: operations["pos_get_customers"]["parameters"]["query"]): RequestData<(components["schemas"]["POSCustomerItem"])[]>;
    getOrder(orderId: string): RequestData<(components["schemas"]["OrderItem"])>;
    getCustomer(customerId: string): RequestData<(components["schemas"]["POSCustomerItem"])>;
    createCustomer(customer: components["schemas"]["POSCreateCustomerItem"]): RequestData<(components["schemas"]["POSCustomerItem"])>;
    getPaymentMethods(params: operations["pos_get_payments_methods"]["parameters"]["query"]): RequestData<(components["schemas"]["PaymentMethods"])[]>;
    getSales(params: operations["pos_get_sales"]["parameters"]["query"]): RequestData<(components["schemas"]["SalesItem"])>;
    getClosure(params: operations["pos_get_closure"]["parameters"]["query"]): RequestData<(components["schemas"]["ClosureItem"])>;
    getPayments(params: operations["pos_get_payments"]["parameters"]["query"]): RequestData<(components["schemas"]["PaymentItem"])[]>;
    updateOrder(orderId: string, order: components["schemas"]["UpdateOrderItem"]): RequestData<(components["schemas"]["OrderItem"])>;
};
export { posFactory, };
