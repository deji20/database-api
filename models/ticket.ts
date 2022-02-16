import { Schema } from "mongoose";
import { Query } from "./models";

export interface Ticket{
    email: string,
    name: string,
    type: string,
    status: TicketStatus,
    subject: string,
    message: string
}

export enum TicketStatus{
    New,
    Active,
    Paused,
    Completed
}

export const TicketSchema = new Schema({
    email: String,
    name: String,
    type: String,
    status: String,
    subject: String,
    message: String
})
