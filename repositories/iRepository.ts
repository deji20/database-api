import {IModel} from "../models/models";

export interface IRepository<Model>{
    create(model: Model): Promise<boolean>;
    getById(id: string): Promise<Model | null>;
    get(filter: object): Promise<Model[] | null>;
    update(id: string, model: Model): Promise<Model>;
    delete(id: string): Promise<boolean>;
}