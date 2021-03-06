
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Order, OrderSchema } from "../models/order";

export class OrderRepository{
    
    private orders: Model<Order>;
    
    constructor(){
        this.orders = database<Order>("orders", OrderSchema)
    }

    async create(order: Order){
        return this.orders.create(order);
    }

    async getById(id: string){
        return this.orders.findById(id);
    }

    async get(){
        return this.orders.find();
    }

    async delete(id: string){
        this.orders.findByIdAndDelete(id);
    }

    async update(id: string, order: Order){
        this.orders.findByIdAndUpdate(id, order);
    }
}