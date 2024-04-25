import { Router } from "express";
import {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
} from "../controllers/tickets.js";

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);
ticketsRouter.get("/:id", getTicket);

export default ticketsRouter;
