
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Order, OrderSchema } from "../models/order";

export class OrderRepository{
    
    private orders: Model<Order>;
    
    constructor(){
        this.orders = database<Order>("orders", OrderSchema)
    }

    async create(order: Order){
        return await this.orders.create(order);
    }

    async getById(id: string){
        return await this.orders.findOne({id: id});
    }

    async get(){
        let result = await this.orders.find();
        return result;
    }

    async delete(id: string){
        await this.orders.findOneAndDelete({id: id});
    }

    async update(id: string, order: Order){
        const result = await this.orders.findOneAndUpdate({id: id}, order);
        result.save()
        return result.toObject();
    }
}