import { Query } from "../models/models";
import { Ticket, TicketStatus } from "../models/ticket";
import { TicketRepository } from "../repositories/ticketRepository";
import IdService from "./idService";

export default class TicketService{
    private repository: TicketRepository;

    constructor(){
        this.repository = new TicketRepository()
    }

    async get(query?: Query): Promise<Ticket[] | null>{
        return await this.repository.get(query);
    }

    async getById(id: string): Promise<Ticket | null>{
        return await this.repository.getById(id);
    }

    async create(ticket: Ticket): Promise<Ticket>{
        ticket.status = TicketStatus.New
        ticket.id = await IdService.increment("ticket", {prefix: ticket.type[0]})
        return await this.repository.create(ticket);
    }

    async update(id: string, ticket: Ticket): Promise<Ticket>{
        await this.repository.update(id, ticket as Ticket);
        return ticket;
    }

    async delete(id: string): Promise<boolean | null>{
        let del = await this.repository.delete(id);
        return true;

    }
}