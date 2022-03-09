import { Product } from "./product";

/*function ToPaymentItem(product: Product){
    return {
        name: product.name

    } as paymentItem
}*/

interface paymentItem{
    reference: "string",
    name: "string",
    quantity: 0,
    unit: "string",
    unitPrice: 0,
    taxRate: 0,
    taxAmount: 0,
    grossTotalAmount: 0,
    netTotalAmount: 0
}
