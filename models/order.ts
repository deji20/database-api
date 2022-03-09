import { Schema } from "mongoose";
import { Customer, CustomerSchema } from "./customer";
import { Query } from "./models";
import { Product, ProductSchema } from "./product";

export interface Order{
    customer: Customer,
    paymentId: string,
    products: {
        product: Product,
        amount: number,
    }[],
}

export const OrderSchema = new Schema({
    customer: CustomerSchema,
    paymentId: String,
    Products: [{
        product: ProductSchema,
        amount: Number,
    }]

})
