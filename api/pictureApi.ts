import express, { Router } from "express";
import { Product, ProductQuery } from "../models/models";
import { ProductRepository } from "../repositories/productRepository";
import ProductService from "../services/productService";
import multer from "multer";

let router = express.Router();

//for multipart/form-data
const upload = multer();

let productService: ProductService = new ProductService();

router.get("/", async (req, res) => {
    try{
        let dbQuery: ProductQuery = {
            filter: {}, 
            projection: {}
        }; 

        if(req.query.projection){
            if(req.query.projection && typeof req.query.projection === "string"){
                req.query.projection.split(",").forEach((field) => dbQuery.projection[field] = true);
            }
        }

        if(req.query.filter &&  typeof req.query.filter === "string"){
            req.query.filter.split(",").forEach(filter => {
                let keyVal = filter.split("=")
                    dbQuery.filter[keyVal[0]] = keyVal[1];
            })
        }
        let products = await productService.get(dbQuery);
        console.log(products);
        res.send(products)
    }catch(err){
        res.send(err);
    }
});

router.get("/categories", async (req, res) => {
    try{
        let categories = await productService.getCategories();
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
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    try{
        let product = await productService.create(req.body.product, req.body.pictures);
        res.send(product);
    }catch(err){
        res.send(err);
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