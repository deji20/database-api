
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { ProductSchema, Product, ProductQuery } from "../models/product";

export class ProductRepository{
    
    private products: Model<Product>;
    
    constructor(){
        this.products = database<Product>("products", ProductSchema)
    }

    async getById(id: string){
        return (await this.products.findOne({id: id})).toObject();
    }
    async getCategories(query: ProductQuery){
        return this.products.distinct("categories", query.search);
    }
    async get(query: ProductQuery){
        if(query.projection) {
            return await this.products
                .find({...query.search, ...query.filter})
                .select(query.projection)
                .limit(query.pagination?.amount)
                .skip(query.pagination?.offset);
        }
        return await this.products
            .find({...query.search, ...query.filter})
            .limit(query.pagination?.amount)
            .skip(query.pagination?.offset);
    }

    async create(product: Product){
        let prod = await this.products.create(product);
        return prod.toObject();
    }
    async update(id: string, product: Product){
        const result = await this.products.findOneAndUpdate({id: id}, product)
        return result.toObject();
    }
    async delete(id: string){
        const result = await this.products.findOneAndDelete({id: id});
    }
}