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
    app.use(cors());  //I Need to configure cors origins more specifically at different middleware levels
    app.use(express.json({limit: "10mb"}));
    
    //setting routers
    const productApi = require("./api/productApi");
    const categoryApi = require("./api/categoryApi");
    const cartApi = require("./api/cartApi");
    const ticketApi = require("./api/ticketApi");
    const paymentApi = require("./api/paymentApi");
    const orderApi = require("./api/orderApi");

    
    app.use("/payment", paymentApi);
    app.use("/category", categoryApi);
    app.use("/cart", cartApi);
    
    //parses url query string for filter and projections to be used by the procedding api repositories
    app.use(dbQuery);
    app.use("/order", orderApi);
    app.use("/product", productApi);
    app.use("/ticket", ticketApi);

    app.use("/images", express.static(config.imagePath));
    app.use("/", express.static("./public"));
    
    app.listen(config.port, () => {
        console.log("application started on port:", config.port);
    })
})