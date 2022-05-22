import { ObjectId } from "mongodb";
import { PictureDto } from "../models/models";
import { ProductQuery, Product } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import FileService from "./fileService";
import Path from "path";
import PaymentRepository from "../repositories/paymentRepository";
import { OrderRepository } from "../repositories/orderRepository";
import { Order, OrderLine } from "../models/order";
import { CartRepository } from "../repositories/cartRepository";
import { Cart } from "../models/cart";

export default class PaymentService{
    private productRepo: ProductRepository;
    private paymentRepo: PaymentRepository;
    private cartRepo: CartRepository;

    constructor(){
        this.cartRepo = new CartRepository();
        this.productRepo = new ProductRepository();
        this.paymentRepo = new PaymentRepository();
    }

    async getById(id: string): Promise<Product | null>{
        if(!ObjectId.isValid(id)) throw new Error("invalid id");
        return await this.productRepo.getById(id);
    }

    async confirmPayment(paymentId: string){
        
    }

    async create(cartId: string){
        const cart: Cart = await this.cartRepo.getById(cartId);
        const products = await this.productRepo.get({
            filter:{ 
                _id: { $in: cart.products.map((line) => line.id)}
            }
        } as ProductQuery)
        const orderLines: OrderLine[] = cart.products.map((prod) => {
            return {amount: prod.amount, product: products.find((p) => p.id == prod.id)}
        });
        const paymentId = await this.paymentRepo.post(orderLines);
        return paymentId;
    }

}