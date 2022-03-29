import { Schema } from "mongoose";
import { Query } from "./models";

export interface Customer{
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    postCode: string,
    email: string,
    phone: string
}

export const CustomerSchema = new Schema({
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    postCode: String,
    email: String,
    phone: String
})