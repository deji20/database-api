import express from "express";
import { Query } from "../../models/models"

let router = express.Router();

router.use( async (req, res, next) => {
    try{
        let dbQuery: Query = {
            filter: null,
            projection: null,
            search: null,
            pagination: null,
        }; 

        if(req.query.pagination && typeof req.query.pagination === "string"){
            let fields = req.query.pagination
                .split(",")
                .filter(field => !isNaN(Number.parseInt(field)))
                .map((field) => Number.parseInt(field));
            if(fields[0]) dbQuery.pagination = {amount: fields[0], offset: fields[1]};
        }

        if(req.query.projection && typeof req.query.projection === "string"){
            dbQuery.projection = {};
            req.query.projection.split(",").forEach((field) => dbQuery.projection[field] = true);
        }

        if(req.query.search &&  typeof req.query.search === "string"){
            dbQuery.search = {};
            req.query.search.split(",").forEach(search => {
                let keyVal = search.split("=")
                    dbQuery.search[keyVal[0]] = { 
                        $regex: `.*${keyVal[1]}.*`, 
                        $options: "i"
                    }
                }
            );
        }
        if(req.query.filter &&  typeof req.query.filter === "string"){
            dbQuery.filter = {};
            req.query.filter.split(",").forEach(filter => {
                let keyVal = filter.split("=")
                    dbQuery.filter[keyVal[0]] = keyVal[1];
            })
        }
        req.body.dbQuery = dbQuery;
        next()
    }catch(err){
        res.send(err);
    }
});

export default router