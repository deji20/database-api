import express, { Router } from "express";
import { Order } from "../models/order";
import Mailer from "../services/mailService";
import OrderService  from "../services/orderService";

let router = express.Router();

const orderService: OrderService = new OrderService();

router.get("/", async (req, res) => {
    try{
        const mail = new Mailer();
        console.log(await mail.send());

        const orders = await orderService.get();
        res.send(orders);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try{
        const order = await orderService.getById(req.params.id);
        res.send(order);
    }catch(err){
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    await orderService.delete(req.params.id);
    res.status(204).send()
})

module.exports = router;