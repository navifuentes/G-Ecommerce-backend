import { Router } from "express";

import productsRouter from "./products.js";
import usersRouter from "./users.js";
import cartsRouter from "./carts.js";
import ticketsRouter from "./tickets.js"
//import viewsRouter from "./views.js";
// 
const routerApi = (app) => {
  Router();
  app.use("/api/products", productsRouter);
  app.use("/api/users", usersRouter);
  app.use("/api/carts", cartsRouter);
  app.use("/api/tickets", ticketsRouter);
};

export default routerApi;
