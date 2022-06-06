import { Schema } from "mongoose";
import { Query } from "./models";

export interface Product{
    id?: string,
    price: number,
    name: string,
    categories: string[],
    version: Version[]
}

export interface Version
{
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
    attributes: {name: string, value: string}[],
    amount: number,
}

export const ProductSchema = new Schema({
    id: String,
    price: Number,
    name: String,
    categories: [String],
    version: [{
        pictures: [{
            id: String,
            ratio: {
                x: Number, 
                y: Number
            }, 
            path: String,
            alt: String,
            mime: String,
        }],
        description: String,
        attributes: [{
            name: String,
            value: String,
        }],
        amount: Number,
    }]
})

export interface ProductQuery extends Query{}
