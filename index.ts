import express from "express";
import {connect} from "./MongoDatabase";
import config from "./config";
import cors from "cors";
import env from "dotenv";
env.config();

import dbQuery from "./api/filters/dbQuery"

const app = express();

process.env.BASE_DIR = __dirname;

connect().then(() => {
    //setting express middleware
    //app.use(cors({origin:config.origins}));
    app.use(express.json({limit: "10mb"}));
    
    //setting routers
    let productApi = require("./api/productApi");
    let categoryApi = require("./api/categoryApi");
    let ticketApi = require("./api/ticketApi");

    app.use((req, res, next) => {
        console.log("parameters")
        console.log(req.path);
        next();
    });

    app.use("/category", categoryApi);

    app.use(dbQuery);
    app.use("/product", productApi);
    app.use("/ticket", ticketApi);

    app.use("/images", express.static(config.imagePath));
    app.use("/", express.static("./public"));
    
    app.listen(config.port, () => {
        console.log("application started on port:", config.port);
    })
})