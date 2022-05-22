import { Date, Schema } from "mongoose";
import { Customer, CustomerSchema } from "./customer";
import { Query } from "./models";
import { Product, ProductSchema } from "./product";

export interface Order{
    customer?: Customer,
    paymentId: string,
    created?: Date,
    products: OrderLine[],
    status: OrderStatus,
}

export interface OrderLine{
    product: Product,
    amount: number,
}

export enum OrderStatus{
    NEW = "NEW",
    PAYED = "PAYED"

}

export const OrderSchema = new Schema({
    customer: CustomerSchema,
    paymentId: String,
    created: Date,
    Products: [{
        product: ProductSchema,
        amount: Number,
    }],
    status: String
})
