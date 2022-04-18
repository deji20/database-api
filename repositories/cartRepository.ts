
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Cart, CartSchema } from "../models/cart";

export class CartRepository{
    
    private carts: Model<Cart>;
    
    constructor(){
        this.carts = database<Cart>("carts", CartSchema)
    }

    async getById(cartId: string){
        return await this.carts.findById<Cart>(cartId);
    }

    async create(){
        let newCart: Cart = {products: []};
        newCart = await this.carts.create<Cart>(newCart);
        return newCart;
    }

    async update(id: string, cart: Cart){
        cart._id = id;
        let result = await this.carts.findOneAndReplace<Cart>(cart);
        console.log(result);
        return cart;
    }
}