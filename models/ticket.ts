import { Schema } from "mongoose";
import { Query } from "./models";

export interface Ticket{
    id: string,
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
    id: String,
    email: String,
    name: String,
    type: String,
    status: String,
    subject: String,
    message: String
})
