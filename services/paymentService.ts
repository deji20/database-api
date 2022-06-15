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
import { Customer } from "../models/customer";
import IdService from "./idService";
import Mailer from "./mailService";
import Mail from "nodemailer/lib/mailer";
import { MailRecipient } from "../models/mail";

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
        // if order is found and order status is new 
        // update order status and track product inventory

        if(order && order.status == OrderStatus.NEW){
            //change status of the order
            order.status = OrderStatus.PAYED;

            //send order confirmed mail
            const mailer = new Mailer("Order Confirmed", { name:"Det Indiske Hjørne", address: "kontakt@indiskehjoerne.dk"});
            mailer.addRecipient({
                name: order.customer.privatePerson.firstName + " " + order.customer.privatePerson.lastName, 
                address: order.customer.email
            });
            mailer.addBodyDocument("orderConfirmed.html");
            await mailer.send();

            //update product amounts
            order.products.forEach(async productLine => {
                const product = await this.productRepo.getById(productLine.product.id)
                product.version[0].amount -= productLine.amount;
                await this.productRepo.update(productLine.product.id, product);
            });
            await this.orderRepo.update(order.id, order)
        }
    }

    //returns a payment id used by the frontend for checkout and payment
    async create(cartId: string, customer: Customer){
        const cart: Cart = await this.cartRepo.getById(cartId);
        const products = await this.productRepo.get({
            filter:{ 
                id: { $in: cart.products.map((line) => line.id)}
            }
        } as ProductQuery)
        
        
        const order = {
            id: await IdService.increment("order"),
            products: cart.products.map((prod) => ({amount: prod.amount, product: products.find((p) => p.id == prod.id)})),
            created: new Date(),
            customer: customer,
            status: OrderStatus.NEW,
        } as Order
        //expand the customers cart into an orderline with expanded product information


        //requesting a payment id from nets payment repository
        //saving the paymentId and products to the order to be confirmed by the confirmPayment method
        order.paymentId = await this.paymentRepo.create(order);

        //saving the newly created order
        order.paymentId && this.orderRepo.create(order);

        return order.paymentId;
    }

}