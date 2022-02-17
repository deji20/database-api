import express from "express";
import {connect} from "./MongoDatabase";
import config from "./config";
import cors from "cors";
import env from "dotenv";
env.config();

const app = express();

process.env.BASE_DIR = __dirname;

connect().then(() => {
    //setting express middleware
    app.use(cors({
        origin:config.origins
    }));
    app.use(express.json({limit: "10mb"}));
    
    //setting routers
    let productApi = require("./api/productApi");
    let categoryApi = require("./api/categoryApi");
    app.use("/product", productApi);
    app.use("/category", categoryApi);
    app.use("/images", express.static("./files/public"));
    app.use("/", express.static("./public"));
    
    app.listen(config.port, () => {
        console.log("application started on port:", config.port);
    })
})