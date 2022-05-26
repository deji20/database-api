
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
        return await this.orders.find();
    }

    async delete(id: string){
        this.orders.findByIdAndDelete(id);
    }

    async update(id: string, order: Order){
        console.log(order);
        this.orders.findByIdAndUpdate(id, order);
    }
}