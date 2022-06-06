
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Cart, CartSchema } from "../models/cart";
import idService from "../services/idService";

export class CartRepository{
    
    private carts: Model<Cart>;
    
    constructor(){
        this.carts = database<Cart>("carts", CartSchema)
    }

    async getById(cartId: string){
        try{
            return await this.carts.findOne<Cart>({id: cartId});
        }catch{
            return null;
        }
    }

    async create(){
        let newCart: Cart = {products: []};
        newCart.id = await idService.increment("cart")
        newCart = await this.carts.create<Cart>(newCart);
        return newCart;
    }

    async update(id: string, cart: Cart){
        cart.id = id;
        await this.carts.findOneAndUpdate<Cart>({id: id}, cart);
        return cart;
    }
}