import { Schema } from "mongoose";
import { Query } from "./models";

export interface Cart{
    id?: string,
    products: {
        id: string,
        amount: number
    }[]
}

export const CartSchema = new Schema({
    id: String,
    products: [{
        id: String,
        amount: Number
    }]
})
