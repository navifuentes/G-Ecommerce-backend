import { Router } from "express";
import {
  getCarts,
  getCart,
  getProductsFormated,
  createCart,
  updateCart,
  purchase,
  addToCart,
  removeProduct,
  deleteCart,
} from "../controllers/carts.js";
const cartsRouter = Router();

cartsRouter.get("/", getCarts);
cartsRouter.get("/:id", getCart);
cartsRouter.get("/formated/:id", getProductsFormated);
cartsRouter.post("/", createCart);
cartsRouter.put("/:cid", updateCart);
cartsRouter.put("/purchase/:cid", purchase);
cartsRouter.put("/:cid/product/:pid", addToCart);
cartsRouter.delete("/:cid/product/:pid", removeProduct);
cartsRouter.delete("/:id", deleteCart);

export default cartsRouter;
