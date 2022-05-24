
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Cart, CartSchema } from "../models/cart";

export class CartRepository{
    
    private carts: Model<Cart>;
    
    constructor(){
        this.carts = database<Cart>("carts", CartSchema)
    }

    async getById(cartId: string){
        try{
            return await this.carts.findById<Cart>(cartId);
        }catch{
            return null;
        }
    }

    async create(){
        let newCart: Cart = {products: []};
        newCart = await this.carts.create<Cart>(newCart);
        return newCart;
    }

    async update(id: string, cart: Cart){
        cart._id = id;
        await this.carts.findByIdAndUpdate<Cart>(id, cart);
        return cart;
    }
}