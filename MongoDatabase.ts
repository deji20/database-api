import mongoose, { Model, Mongoose } from "mongoose";
import config from "./config";

export async function connect(){
    console.log(config.databaseConnection);
    mongoose.connect(config.databaseConnection);
}

export default function get<T>(collection: string, model: mongoose.Schema){
    return mongoose.model<T>(collection, model);
}