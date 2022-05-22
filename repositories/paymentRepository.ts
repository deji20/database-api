
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Category, CategorySchema } from "../models/category";
import config from "../config";
import axios, { AxiosInstance } from "axios";
import { Product } from "../models/product";
import { OrderLine } from "../models/order";


export default class PaymentRepository{
    
    private orders: Model<Category>;
    private api: AxiosInstance;
    
    constructor(){
        this.api = axios.create({
            baseURL: config.payment.endpoint,
            headers: {
                "content-type": "application/*+json",
                //"CommercePlatformTag": "SOME_STRING_VALUE",
                "Authorization": config.payment.secret
            }
        });
    }

    async get(){
    }

    async post(orderLines: OrderLine[], options?: any){
        //transform products into nets parsable items
        const items = orderLines.map((line) => {
            const taxRate = 2000;
            return {
                reference: line.product.name,
                name: line.product.name,
                quantity: line.amount,
                unit: "Pcs",
                unitPrice: line.product.price,
                taxRate: taxRate,
                taxAmount: (line.product.price * line.amount * taxRate / 10000),
                grossTotalAmount: (line.product.price * line.amount) + (line.product.price * line.amount * taxRate / 10000),
                netTotalAmount: line.product.price * line.amount,
            }
        });

        //create order
        const order = {
            items: items,
            amount: items.reduce<number>((prev, cur) =>  cur.grossTotalAmount += prev , 0),
            currency: "DKK"
        };
        console.log(order);
        //set up NETS checkout options  
        const checkout = {
            url: config.payment.checkoutOptions.url,
            termsUrl: config.payment.checkoutOptions.termsUrl,
            consumer: {
                privatePerson: {
                    firstName: "Deji", 
                    lastName: "Ehinlanwo"
                },
                email: "ehinlanwo.deji@gmail.com",
            },
            ...options
        }
        //set up the webhooks that will catch the order being payed
        const notifications = {
            
        }

        try{
            const paymentId = await this.api.post("/v1/payments", {checkout, order});
            return paymentId.data.paymentId
        }catch(err){
            console.log(err.response.status, err.response.data);
            console.log("error in payment")
        }
    }

    async update(){

    }
}