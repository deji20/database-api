import { Schema } from "mongoose";
import { Query } from "./models";

export interface Product{
    _id: string,
    price: number,
    name: string,
    categories: string[],
    version: {
        pictures: {
            id?: string,
            ratio: {
                x: number, 
                y: number
            }, 
            path: string,
            alt: string,
            mime: string,
        }[],
        description: string,
        amount: number,
    }[]
}

export const ProductSchema = new Schema({
    price: Number,
    name: String,
    categories: [String],
    version: [{
        pictures: [{
            _id: String,
            ratio: {
                x: Number, 
                y: Number
            }, 
            path: String,
            alt: String,
            mime: String,
        }],
        description: String,
        amount: Number,
    }]
})

export interface ProductQuery extends Query{}
