import { Schema } from "mongoose";
import { Query } from "./models";

export interface Customer{
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phone: string,
}

export const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phone: String
})