import express, { Router } from "express";
import { PictureDto } from "../models/models";
import { Product, ProductQuery } from "../models/Product";
import { ProductRepository } from "../repositories/productRepository";
import ProductService from "../services/productService";

let router = express.Router();

let productService: ProductService = new ProductService();

router.use((req, res, next) => {
    if(req.body.version && !Array.isArray(req.body.version)) req.body.version = [req.body.version]  
    next()
})

router.use( async (req, res, next) => {
    try{
        let dbQuery: ProductQuery = {
            filter: null,
            projection: null,
            search: null,
        }; 

        if(req.query.projection && typeof req.query.projection === "string"){
            dbQuery.projection = {};
            req.query.projection.split(",").forEach((field) => dbQuery.projection[field] = true);
        }

        if(req.query.search &&  typeof req.query.search === "string"){
            dbQuery.search = {};
            req.query.search.split(",").forEach(search => {
                let keyVal = search.split("=")
                    dbQuery.search[keyVal[0]] = { 
                        $regex: `.*${keyVal[1]}.*`, 
                        $options: "i"
                    }
                }
            );
        }
        if(req.query.filter &&  typeof req.query.filter === "string"){
            dbQuery.filter = {};
            req.query.filter.split(",").forEach(filter => {
                let keyVal = filter.split("=")
                    dbQuery.filter[keyVal[0]] = keyVal[1];
            })
        }
        req.body.dbQuery = dbQuery;
        next()
    }catch(err){
        res.send(err);
    }
});

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
        res.send(err);
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