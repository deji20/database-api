import { Schema } from "mongoose";
import { Query } from "./models";

export interface Customer{
    privatePerson: Person,
    email: string,
    shippingAddress: Address,
    phone: PhoneNumber
}

export interface Person{
    firstName: string
    lastName: string;
}

export interface Address{
    addressLine1: string,
    addressLine2: string,
    city: string,
    postalCode: string,
    country: string,
}

export interface PhoneNumber{
    prefix: string,
    number: string
}


const AddressSchema = new Schema({
    addressLine1: String,
    addressLine2: String,
    city: String,
    postalCode: String,
    country: String,
})
const PhoneNumberSchema = new Schema({
    prefix: String,
    number: String
})
const PersonSchema = new Schema({
    firstName: String,
    lastName: String
})

export const CustomerSchema = new Schema({
    email: String,
    privatePerson: PersonSchema,
    shippingAddress: AddressSchema,
    phone: PhoneNumberSchema
})
