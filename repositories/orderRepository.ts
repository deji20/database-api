
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
        return await this.orders.findById(id);
    }

    async get(){
        let result = await this.orders.find();
        return result;
    }

    async delete(id: string){
        await this.orders.findByIdAndDelete(id);
    }

    async update(id: string, order: Order){
        const result = await this.orders.findByIdAndUpdate(id, order);
        result.save()
        return result.toObject();
    }
}