import { Query } from "../models/models";
import { Order } from "../models/order";
import { ProductQuery } from "../models/product";
import { OrderRepository } from "../repositories/orderRepository";
import PaymentRepository from "../repositories/paymentRepository";
import { ProductRepository } from "../repositories/productRepository";


export default class OrderService{
    private orderRepo: OrderRepository;
    private paymentRepo: PaymentRepository
    private productRepo: ProductRepository;

    constructor(){
        this.orderRepo = new OrderRepository();
        this.paymentRepo = new PaymentRepository();
        this.productRepo = new ProductRepository();
    }

    async get(): Promise<Order[] | null>{
        return await this.orderRepo.get();
    }
    async getById(id: string): Promise<Order | null>{
        return await this.orderRepo.getById(id);
    }

    async create(productIds: string[]){
        const products = await this.productRepo.get({
            filter:{ 
                _id: { $in: productIds}
            }
        } as ProductQuery)

        const paymentId = ""// await this.paymentRepo.post(products);
        return paymentId;
    }
    async update(id: string, order: Order): Promise<Order>{
        await this.orderRepo.update(id, order as Order);
        return order;
    }

    async delete(id: string): Promise<boolean | null>{
        let del = await this.orderRepo.delete(id);
        return true;
    }
}