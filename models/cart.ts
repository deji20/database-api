import { Schema } from "mongoose";
import { Query } from "./models";

export interface Cart{
    _id?: string,
    products: {
        id: string,
        amount: number
    }[]
}

export const CartSchema = new Schema({
    products: [{
        id: String,
        amount: Number
    }]
})
