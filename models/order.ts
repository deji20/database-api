import { Schema } from "mongoose";
import { Customer, CustomerSchema } from "./customer";
import { Query } from "./models";
import { Product, ProductSchema } from "./product";

export interface Order{
    id?: string;
    customer?: Customer,
    paymentId?: string,
    created?: Date,
    products: OrderLine[],
    status: OrderStatus,
}

export interface OrderLine{
    product: Product,
    amount: number,
}

export enum OrderStatus{
    NEW = "new",
    PAYED = "payed",
    SHIPPED = "shipped"

}

export const OrderSchema = new Schema({
    id: Number,
    customer: CustomerSchema,
    paymentId: String,
    created: Date,
    products: [{
        product: ProductSchema,
        amount: Number,
    }],
    status: String
})
