import { ObjectId } from "mongodb";
import { PictureDto } from "../models/models";
import { ProductQuery, Product } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import FileService from "./fileService";
import Path from "path";
import PaymentRepository from "../repositories/paymentRepository";

export default class PaymentService{
    private productRepo: ProductRepository;
    private paymentRepo: PaymentRepository;

    constructor(){
        this.productRepo = new ProductRepository()
        this.paymentRepo = new PaymentRepository();
    }

    async getById(id: string): Promise<Product | null>{
        if(!ObjectId.isValid(id)) throw new Error("invalid id");
        return await this.productRepo.getById(id);
    }

    async confirmPayment(paymentId: string){
        
    }

    async create(productIds: string[]){
        const products = await this.productRepo.get({
            filter:{ 
                _id: { $in: productIds}
            }
        } as ProductQuery)

        const paymentId = await this.paymentRepo.post(products);
        return paymentId;
    }

}