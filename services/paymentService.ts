import { ObjectId } from "mongodb";
import { PictureDto } from "../models/models";
import { ProductQuery, Product } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import FileService from "./fileService";
import Path from "path";
import PaymentRepository from "../repositories/paymentRepository";
import { OrderRepository } from "../repositories/orderRepository";
import { Order, OrderLine, OrderStatus } from "../models/order";
import { CartRepository } from "../repositories/cartRepository";
import { Cart } from "../models/cart";

export default class PaymentService{
    private productRepo: ProductRepository;
    private paymentRepo: PaymentRepository;
    private cartRepo: CartRepository;
    private orderRepo: OrderRepository;

    constructor(){
        this.cartRepo = new CartRepository();
        this.productRepo = new ProductRepository();
        this.paymentRepo = new PaymentRepository();
        this.orderRepo = new OrderRepository();
    }

    async getById(id: string): Promise<Product | null>{
        if(!ObjectId.isValid(id)) throw new Error("invalid id");
        return await this.productRepo.getById(id);
    }

    async confirmPayment(paymentId: string){
        const results = await this.orderRepo.get();
        const order = results.find((o) => o.paymentId == paymentId);
        if(order){
            order.status = OrderStatus.PAYED;
            this.orderRepo.update(order.id, order);
        }
    }

    //returns a payment id used by the frontend for checkout and payment
    async create(cartId: string){
        const cart: Cart = await this.cartRepo.getById(cartId);
        const products = await this.productRepo.get({
            filter:{ 
                _id: { $in: cart.products.map((line) => line.id)}
            }
        } as ProductQuery)
        
        //expand the customers cart into an orderline with expanded product information
        const orderLines: OrderLine[] = cart.products.map((prod) => {
            return {amount: prod.amount, product: products.find((p) => p.id == prod.id)}
        });
        
        //requesting a payment id from nets payment repository
        const paymentId = await this.paymentRepo.create(orderLines);
        
        //saving the paymentId and products as a new order to be confirmed by the confirmPayment method
        this.orderRepo.create({
            paymentId: paymentId,
            products: orderLines,
            created: new Date(),
            status: OrderStatus.NEW,
        } as Order)

        return paymentId;
    }

}