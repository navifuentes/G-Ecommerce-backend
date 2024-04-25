import { ticketsService } from "../services/index.js";

export const getTickets = async (req, res) => {
  try {
    const tickets = await ticketsService.getTickets();
    return res.status(200).send({ status: "Success", payload: tickets });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: "No tickets found" });
  }
};
export const getTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await ticketsService.getTicket(id);
    if (!(id && ticket))
      res.status(404).send({ status: "Error", error: "No ticket found" });

    return res.status(200).send({ status: "Success", payload: ticket });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "Error", error: "No ticket found ?" });
  }
};
export const createTicket = async (req, res) => {
  try {
    const { body } = req;
    if (!body)
      return res
        .status(404)
        .send({ status: "Error", error: "No ticket found" });

    const ticket = await ticketsService.createTicket(body);
    return res.status(200).send({ status: "Success", payload: ticket });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "Error", error: "Could not create a ticket" });
  }
};
export const updateTicket = async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    if (!(id && body))
      return res
        .status(404)
        .send({ status: "Error", error: "No ticket found" });
    const ticket = ticketsService.updateTicket(id, body);
    if (!ticket)
      return res
        .status(400)
        .send({ status: "Error", error: "Ticket not found or failure" });

    return res.status(200).send({ status: "Success", payload: ticket });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ status: "Error", error: "Could not update ticket" });
  }
};
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ticketsService.deleteTicket(id);

    if (!(id && result))
      return res
        .status(404)
        .send({ status: "Error", error: "No ticket found" });

    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ status: "Error", error: "Could not delete ticket" });
  }
};
