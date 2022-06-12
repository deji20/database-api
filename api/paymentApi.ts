import express, { response, Router } from "express";
import config from "../config";
import { Order } from "../models/order";
import PaymentRepository from "../repositories/paymentRepository";
import OrderService from "../services/orderService";
import PaymentService from "../services/paymentService";

let router = express.Router();

let paymentService = new PaymentService();
let orderService = new OrderService();

router.get("/", async (req, res) => {
    try{
        res.send("oki doke");
    }catch(err){
        res.send(err);
    }
});

router.post("/confirm", async (req, res) => {
    const paymentId = req.body?.data?.paymentId;
    !paymentId && res.status(400).send() 
    paymentService.confirmPayment(paymentId);
    res.status(200).send();
})

router.post("/", async (req, res) => {
    try{
        let result = await paymentService.create(req.body.id, req.body.customer);
        res.send({paymentId:result, checkoutId:config.payment.checkoutId})
    }catch(err){
        console.log(err);
        res.status(500).send(err.toString());
    }
});

module.exports = router;