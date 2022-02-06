import express from "express";
import env from "dotenv";
env.config();
import {connect} from "./MongoDatabase";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;

process.env.BASE_DIR = __dirname;
console.log(process.env.CONNECTION_STRING)

connect().then(() => {
    //setting express middleware
    //app.use(cors());
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