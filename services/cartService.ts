import { ObjectId } from "mongodb";
import { Cart } from "../models/cart";
import { CartRepository } from "../repositories/cartRepository";

export default class CartService{
    private repository: CartRepository;

    constructor(){
        this.repository = new CartRepository()
    }

    async get(cartId: string): Promise<Cart | null>{
        if(!ObjectId.isValid(cartId)) return await this.repository.create();
        let result = await this.repository.getById(cartId);
        if(!result) result = await this.repository.create()
        return result
    }

    async update(id: string, cart: Cart): Promise<Cart | null>{
        return await this.repository.update(id, cart);
    }
}