
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Query } from "../models/models";
import { TicketSchema, Ticket } from "../models/ticket";

export class TicketRepository{
    
    private tickets: Model<Ticket>;
    
    constructor(){
        this.tickets = database<Ticket>("tickets", TicketSchema)
    }

    async getById(id: string){
        return await this.tickets.findOne({id: id});
    }
    
    async get(query?: Query){
        if(query && query.projection) return await this.tickets.find({...query.search, ...query.filter}).select(query.projection);
        let ticks = await this.tickets.find({...query.search, ...query.filter});
        return ticks;
    }

    async create(ticket: Ticket){
        let tick = await this.tickets.create(ticket);
        return tick;
    }
    async update(id: string, ticket: Ticket){
        const result = await this.tickets.updateOne({id: id}, ticket)
    }
    async delete(id: string){
        const result = await this.tickets.deleteOne({id: id});
    }
}