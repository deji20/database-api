import { Liquid, Template } from "liquidjs";
import * as path from "path";

export default class DocumentBuilder{
    engine: Liquid
    template: string;
    parameters: object;

    constructor(html: string){
        this.engine = new Liquid();
        this.template = html;
        this.parameters = {};
    }

    public addParameter(name: string, value: string){
        this.parameters[name] = value;
    }

    public addModel<T = any>(name: string, model: T){
        this.parameters[name] = model;
    }

    public build(){
        return this.engine.parseAndRender(this.template, this.parameters)
    }

    public buildSync(){
        return this.engine.parseAndRenderSync(this.template, this.parameters)
    }
}
