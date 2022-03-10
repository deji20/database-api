import express, { Router } from "express";
import { Order } from "../models/order";
import OrderService  from "../services/orderService";

let router = express.Router();

const orderService: OrderService = new OrderService();

router.get("/", async (req, res) => {
    try{
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
        console.log(err);
        res.status(400).send(err);
    }
});


router.delete("/:id", async (req, res) => {
    await orderService.delete(req.params.id);
    res.status(204).send()
})

// router.post("/", async (req, res) => {
//     try{
//         const order = await orderService.create(req.body);
//         res.send(order);
//     }catch(err){
//         res.status(400).send(err);
//     }
// });

module.exports = router;