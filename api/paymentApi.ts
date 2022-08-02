import express, { response, Router } from "express";
import config from "../config";
import { Order } from "../models/order";
import PaymentRepository from "../repositories/paymentRepository";
import OrderService from "../services/orderService";
import PaymentService from "../services/paymentService";

import DocumentBuilder from "../services/documentBuilder";
import fs from "fs";

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
    console.log(req.body);
    !paymentId && res.status(404).send("payment id not found") 
    paymentService.confirmPayment(paymentId);
    res.status(200).send();
})

router.get("/test", async (req, res) => {
    fs.readFile(process.env.BASE_DIR + "/mails/orderConfirmed.html", "utf-8", (err, text) => {
        console.log(text);
    })
    res.status(200).send()
    //const builder = new DocumentBuilder();
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