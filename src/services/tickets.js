import { ticketsRepository } from "../repositories/index.js";

export default class TicketsService {
  getTickets = async () => {
    try {
      const tickets = await ticketsRepository.getTickets();
      return tickets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getTicket = async (tid) => {
    try {
      const ticket = await ticketsRepository.getTicket(tid);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createTicket = async (ticket) => {
    try {
      const ticket = await ticketsRepository.createTicket(ticket);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateTicket = async (tid, update) => {
    try {
      const ticket = await ticketsRepository.createTicket(tid, update);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteTicket = async (tid) => {
    try {
      const result = await ticketsRepository.deleteTicket(tid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
