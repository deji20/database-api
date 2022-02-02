import express, { Router } from "express";
import { Category } from "../models/category";
import CategoryService from "../services/categoryService";

let router = express.Router();

let categoryService: CategoryService = new CategoryService();

router.get("/", async (req, res) => {
    try{
        let categories = await categoryService.get();
        res.send(categories);
    }catch(err){
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    try{
        let category = await categoryService.update(req.body);
        res.send(category);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;