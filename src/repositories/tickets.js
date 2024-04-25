import { ticketDao } from "../dao/mongo/index.js";

export default class TicketsRepository {
  getTickets = async () => {
    try {
      const tickets = await ticketDao.getTickets();
      return tickets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getTicket = async (tid) => {
    try {
      const ticket = await ticketDao.getTicket(tid);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createTicket = async (cart) => {
    try {
      const ticket = await ticketDao.createTicket(cart);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateTicket = async (tid, update) => {
    try {
      const ticket = await ticketDao.updateTicket(tid, update);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteTicket = async (tid) => {
    try {
      const result = await ticketDao.deleteTicket(tid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
