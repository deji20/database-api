import { Order } from "../models/order";
import { OrderRepository } from "../repositories/orderRepository";


export default class OrderService{
    private orderRepo: OrderRepository;

    constructor(){
        this.orderRepo = new OrderRepository();

    }

    async get(): Promise<Order[] | null>{
        return await this.orderRepo.get();
    }
    async getById(id: string): Promise<Order | null>{
        return await this.orderRepo.getById(id);
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