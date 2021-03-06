import { ObjectId } from "mongodb";
import { PictureDto } from "../models/models";
import { ProductQuery, Product } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import FileService from "./fileService";
import Path from "path";
import PaymentRepository from "../repositories/paymentRepository";
import { OrderRepository } from "../repositories/orderRepository";
import { Order } from "../models/order";

export default class PaymentService{
    private productRepo: ProductRepository;
    private paymentRepo: PaymentRepository;
    private orderRepo: OrderRepository;

    constructor(){
        this.orderRepo = new OrderRepository();
        this.productRepo = new ProductRepository();
        this.paymentRepo = new PaymentRepository();
    }

    async getById(id: string): Promise<Product | null>{
        if(!ObjectId.isValid(id)) throw new Error("invalid id");
        return await this.productRepo.getById(id);
    }

    async confirmPayment(paymentId: string){
        
    }

    async create(order: {products: {id: string, amount: number}[]}){
        const products = await this.productRepo.get({
            filter:{ 
                _id: { $in: order.products.map((line) => {line.id})}
            }
        } as ProductQuery)

        const paymentId = await this.paymentRepo.post(products);
        return paymentId;
    }

}