import { ObjectID } from "bson";
import { ModifyResult } from "mongodb";
import {getKeyValue} from "get-key-value";

export interface IModel{
    _id: string | undefined;
}

function checkModel<Model extends IModel>(model: Model, obj: Model){
    Object.getOwnPropertyNames(model).forEach((key) => {
        if(key != "_id" &&  getKeyValue<keyof Model, Model>(key as keyof Model, obj) == null){
            throw `Object Missing Key: ${key}`;
        }
    });
}

function standardizeString(str: string){
    return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
}

function parser<Model extends IModel>(model: Model, obj: Model){
    Object.getOwnPropertyNames(model).forEach((key) => {
        
        //standardises text making the starting letter uppercase
        if(key !== "pictures"){
            if(typeof obj[key] === "string"){
                console.log(key, "is string")
                obj[key] = standardizeString(obj[key]);
            }else if(Array.isArray(obj[key])){
                obj[key] = obj[key].map((val) => {
                    if(typeof val === "string"){
                        console.log(key, val, "is string")
                        return standardizeString(val);
                    }
                    return val;
                })
            }
        }
        //checks if values that are supposed to be in arrays have been passed as singular values 
        if( Array.isArray(model[key]) && (!Array.isArray(obj[key]) || typeof obj[key] === "string" )){
            model[key] = [ obj[key] ]
        }else{
            model[key] = obj[key];
        }
    });
    return model
}

export class Product implements IModel{
    _id: string | undefined = "";
    price: number = 0;
    name: string = "";
    categories: Category[] = [];
    version: {
        pictures: string[] | Buffer[];
        description: string;
        amount: number;
    }[] = [{
        pictures: [],
        amount:0,
        description: "",
    }]

    static parse(obj: Product){
        checkModel<Product>(new Product(), obj);
        let product = parser<Product>(new Product(), obj);

        //check if we recieved string or array for pictures as that might mess with turning them into buffers
        product.version[0].pictures.forEach((picture) => {
            //if picture is already binary return picture else convert from base64 to binary
            // useful for saving space when storing pictures in database
            if(!Buffer.isBuffer(picture)){
                picture = Buffer.from(picture, "base64");
            }
            console.log(Buffer.isBuffer(picture));
        })
        return product;
    }
}

export interface Category{
    name: string;
    baseCategory: boolean;
    subCategories: Category[];
}

export interface Category extends IModel{
}
//DTOs
export interface PictureDto{
    id: string;
    data: string;
    alt: string
    ratio: {
        x: Number, 
        y: Number
    }, 
}
export interface Query{
    filter: object; 
    projection: object;
    search: object;
}
export interface CategoryQuery extends Query{}