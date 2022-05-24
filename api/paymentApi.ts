import express, { response, Router } from "express";
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

router.post("/confirm", async (req, res) => {
    console.log(req.body);
    res.status(200).send();
})

router.post("/", async (req, res) => {
    try{
        let result = await paymentService.create(req.body.id);
        res.send({paymentId:result, checkoutId:config.payment.checkoutId})
    }catch(err){
        console.log(err);
        res.status(500).send(err.ToString());
    }
});

module.exports = router;