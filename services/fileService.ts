import { ObjectId } from "mongodb";
import mime from "mime-types";
import fs from "fs";


export default class FileService{
    public directory;
    public folder

    constructor(folder: string, isPublic = false){
        this.folder = folder;
        this.directory = `${process.env.BASE_DIR}/files/${isPublic && "public/"}${folder}`;
        if (!fs.existsSync(this.directory)) {
            fs.mkdirSync(this.directory, {recursive: true})
          }
    }

    create(data: string, mimetype: string): string{
        let id = new ObjectId();
        let path = `${this.directory}/${id.toString()}.${mime.extension(mimetype)}`; 
        
        if(mime.extension(mimetype)){
            fs.writeFile(`${path}`, Buffer.from(data, "base64"), (err) => {
                if(err) throw err;
                console.log("file inserted successfully")
            });
        }else{
            throw "mime type not found"
        }
        return `/api/images/${this.folder}/${id.toString()}.${mime.extension(mimetype)}`;
    }
}