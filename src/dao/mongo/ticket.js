import { ticketModel } from "../models/ticket.js";

export default class Ticket {
  constructor() {}

  getTickets = async () => {
    try {
      const tickets = await ticketModel.find({});
      return tickets;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getTicket = async (query) => {
    try {
      const ticket = await ticketModel.findById(query);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createTicket = async (cart) => {
    try {
      const ticket = await ticketModel.create(cart);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateTicket = async (id, update) => {
    try {
      const ticket = await ticketModel.findByIdAndUpdate(id, update);
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteTicket = async (id) => {
    try {
      const result = await ticketModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
