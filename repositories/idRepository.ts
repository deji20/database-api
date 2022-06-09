
import database from "../MongoDatabase";
import { Model, Schema } from "mongoose";

export interface Id{
    table: string,
    increment: number,
    position: number,
}

export const IdSchema = new Schema({
    table: String,
    increment: {type: Number, default: 1},
    position: {type: Number, default: 0},
})


export class IdRepository{
    
    private ids: Model<Id>;
    
    constructor(){
        this.ids = database<Id>("id", IdSchema)
    }

    async get(table: string){
        return await this.ids.findOne({table: table});
    }

    async update(id: Id){
        await this.ids.updateOne({table: id.table}, id);
    }

    async delete(id:Id){
        await this.ids.deleteOne({table: id.table});
    }

    async create(id:Id){
        return await this.ids.create(id);
    }
}