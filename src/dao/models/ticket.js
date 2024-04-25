import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: "true",
      },
      quantity: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  client: {
    _id: false,
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telNumber: {
      type: Number,
      required: true,
    },
  },
});

export const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
