import express, { Router } from "express";
import { Ticket } from "../models/ticket";
import TicketService from "../services/ticketService";

let router = express.Router();

const ticketService: TicketService = new TicketService();

router.get("/", async (req, res) => {
    try{
        let tickets = await ticketService.get(req.body.dbQuery);
        res.send(tickets);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

router.get("/:id", async (req, res) => {
    try{
        let ticket = await ticketService.getById(req.params.id);
        res.send(ticket);
    }catch(err){
        console.log(err);
        res.send(err);
    }
});


router.delete("/:id", async (req, res) => {
    await ticketService.delete(req.params.id);
    res.status(204).send()
})

router.post("/", async (req, res) => {
    try{
        let ticket = await ticketService.create(req.body);
        res.send(ticket);
    }catch(err){
        res.send(err);
    }
});

module.exports = router;