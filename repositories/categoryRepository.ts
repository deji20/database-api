
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";
import { Category, CategorySchema } from "../models/category";

export class CategoryRepository{
    
    private categories: Model<Category>;
    
    constructor(){
        this.categories = database<Category>("categories", CategorySchema)
    }

    async get(){
        return await this.categories.find();
    }

    async update(categories: Category[]){
        await this.categories.deleteMany();
        console.log(categories);
        let update = await this.categories.create(categories)
        update.map((u) => console.log(u))
    }
}