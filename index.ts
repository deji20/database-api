import express from "express";
import formidable from "express-formidable"
import {connect} from "./MongoDatabase";
import cors from "cors";
import env from "dotenv";
env.config();

const app = express();
const PORT = process.env.PORT;

process.env.BASE_DIR = __dirname;

connect().then(() => {
    //setting express middleware
    app.use(cors({
        origin:["http://indiskehjørne.dk", "http://13.51.224.204"]
    }));
    app.use(express.json({limit: "10mb"}));
    
    //setting routers
    let productApi = require("./api/productApi");
    let categoryApi = require("./api/categoryApi");
    app.use("/product", productApi);
    app.use("/category", categoryApi);
    app.use("/images", express.static("./files/public"));
    app.use("/", express.static("./public"));
    
    app.listen(PORT, () => {
        console.log("application started on port:", PORT);
    })
})