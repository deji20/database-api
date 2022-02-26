import { ObjectId } from "mongodb";
import { PictureDto } from "../models/models";
import { ProductQuery, Product } from "../models/product";
import { ProductRepository } from "../repositories/productRepository";
import FileService from "./fileService";
import Path from "path";

export default class ProductService{
    private repository: ProductRepository;
    private fileService: FileService;

    constructor(){
        this.repository = new ProductRepository()
        this.fileService = new FileService("product", true);
    }

    get(query: ProductQuery): Promise<Product[] | null>{
        let result = this.repository.get(query);
        return result;
    }

    async getCategories(query: ProductQuery): Promise<string[] | null>{
        return await this.repository.getCategories(query);
    }

    async getById(id: string): Promise<Product | null>{
        if(!ObjectId.isValid(id)) throw new Error("invalid id");
        return await this.repository.getById(id);
    }

    async create(product: Product): Promise<Product>{
        product.version.forEach((ver) => {
            ver.pictures.forEach(verPic => {
                if(verPic.path.includes("data:image")){
                    verPic.path = verPic.path.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
                    verPic.path = this.fileService.create(verPic.path as unknown as string, verPic.mime)
                }
            })
        });
        return await this.repository.create(product);
    }

    async update(id: string, product: Product): Promise<Product>{
        product.version.forEach((ver) => {
            ver.pictures.forEach(verPic => {
                if(verPic.path.includes("data:image")){
                    verPic.path = verPic.path.replace(/^data:image.*base64,/, "");
                    console.log(verPic.path);
                    verPic.path = this.fileService.create(verPic.path as unknown as string, verPic.mime)
                }
            })
        });
        await this.repository.update(id, product as Product);
        return product;
    }

    async delete(id: string): Promise<boolean | null>{
        let del = await this.repository.delete(id);
        return true;

    }
}