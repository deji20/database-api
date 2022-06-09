import express, { Router } from "express";

import CartService from "../services/cartService";

let router = express.Router();
let cartService: CartService = new CartService();

router.get("/:id", async (req, res) => {
    try{
        const cart = await cartService.get(req.params.id);
        res.send(cart);
    }catch(err){
        res.send(err);
    }
});

router.patch("/:id", async (req, res) => {
    try{
        const cart = await cartService.update(req.params.id, req.body);
        res.send(cart);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;