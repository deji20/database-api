
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Category, CategorySchema } from "../models/category";
import config from "../config";
import axios, { AxiosInstance } from "axios";
import { Product } from "../models/product";


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

    async post(products: Product[], options?: any){
        //transform products into nets parsable items
        const items = products.map((product) => {
            return {
                reference: product.name,
                name: product.name,
                quantity: 1,
                unit: "Pcs",
                unitPrice: 100,
                taxRate: 10,
                taxAmount: 10,
                grossTotalAmount: 100,
                netTotalAmount: 100
            }
        });

        //create order
        const order = {
            items: items,
            amount: items.map(item => item.netTotalAmount).reduce((prev, cur) =>  prev += cur),
            currency: "DKK",
            reference: "string"
        }
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