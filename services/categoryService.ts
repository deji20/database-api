import { Category } from "../models/category";
import { CategoryRepository } from "../repositories/categoryRepository";

export default class CategoryService{
    private repository: CategoryRepository;

    constructor(){
        this.repository = new CategoryRepository()
    }

    async get(): Promise<string[] | null>{
        let result = await this.repository.get();
        return result.map((category) => category.name);
    }

    async update(categories: string[]): Promise<string[]>{
        await this.repository.update(categories.map(cat => ({name: cat} as Category)));
        return categories
    }
}