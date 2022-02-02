import { Schema } from "mongoose";
import { Query } from "./models";

export interface Category{
    name: string,
}

export const CategorySchema = new Schema({
    name: String,
})
