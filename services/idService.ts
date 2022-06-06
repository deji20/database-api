import { IdRepository, Id } from "../repositories/idRepository";


class IdService{
    private idRepo: IdRepository;

    constructor(){
        this.idRepo = new IdRepository();

    }

    async increment(table: string, options?:{prefix?: string, postfix?: string}){
        let id; 
        id = await this.idRepo.get(table);
        if(id){
            if(id.position == null) id.position = 0;
            id.position += id.increment;
            await id.save();
        }else{
            let id = await this.idRepo.create({table: table} as Id)
        }
        return `${options?.prefix || ""}${id.position}${options?.postfix || ""}`;
    }
}

export default new IdService()