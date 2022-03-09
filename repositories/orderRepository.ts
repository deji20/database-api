
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Order, OrderSchema } from "../models/order";

export class OrderRepository{
    
    private orders: Model<Order>;
    
    constructor(){
        this.orders = database<Order>("orders", OrderSchema)
    }
}