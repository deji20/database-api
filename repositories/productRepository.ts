
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { ProductSchema, Product, ProductQuery } from "../models/Product";

export class ProductRepository{
    
    private products: Model<Product>;
    
    constructor(){
        this.products = database<Product>("products", ProductSchema)
    }

    async getById(id: string){
        return await this.products.findById(id);
    }
    async getCategories(query: ProductQuery){
        return this.products.distinct("categories", query.search);
    }
    async get(query: ProductQuery){
        if(query.projection) return await this.products.find({...query.search, ...query.filter}).select(query.projection);
        return await this.products.find({...query.search, ...query.filter});
    }

    async create(product: Product){
        let prod = await this.products.create(product);
        return prod;
    }
    async update(id: string, product: Product){
        const result = this.products.updateOne({_id: id}, product)
        return result;
    }
    async delete(id: string){
        const result = this.products.deleteOne({_id: id});
        console.log(result);
        return result;
    }
}