import express, { Router } from "express";
import { PictureDto } from "../models/models";
import { Product, ProductQuery } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import ProductService from "../services/productService";

let router = express.Router();

let productService: ProductService = new ProductService();

router.use((req, res, next) => {
    if(req.body.version && !Array.isArray(req.body.version)) req.body.version = [req.body.version]  
    next()
})

router.get("/", async (req, res) => {
    const result = await productService.get(req.body.dbQuery) 
    res.send(result)
})

router.get("/categories", async (req, res) => {
    try{
        let categories = await productService.getCategories(req.body.dbQuery);
        res.send(categories);
    }catch(err){
        res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    try{
        let product = await productService.getById(req.params.id);
        res.send(product);
    }catch(err){
        res.status(400).send(err);
    }
});

router.post("/", async (req, res) => {
    try{
        let product = await productService.create(req.body);
        res.send(product);
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.patch("/:id", async (req, res) => {
    try{
        let product = await productService.update(req.params.id, req.body);
        res.send(product);
    }catch(err){
        res.send(err);
    }
});
router.delete("/:id", async (req, res) => {
    try{
        let product = await productService.delete(req.params.id);
        res.send(product);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;