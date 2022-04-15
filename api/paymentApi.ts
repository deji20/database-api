import express, { Router } from "express";
import config from "../config";
import { Order } from "../models/order";
import PaymentRepository from "../repositories/paymentRepository";
import PaymentService from "../services/paymentService";

let router = express.Router();

let paymentService = new PaymentService();

router.get("/", async (req, res) => {
    try{
        res.send("oki doke");
    }catch(err){
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    try{
        
        let result = await paymentService.create(req.body);
        //res.send({paymentId:result, checkoutId:config.payment.checkout})
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

module.exports = router;