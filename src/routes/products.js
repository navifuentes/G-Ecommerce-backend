import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";
import { verifyRole } from "../middleware/auth.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProduct);
productsRouter.post(
  "/",
  (req, res, next) => verifyRole(req, res, next, ["admin", "premium"]),
  createProduct
);
productsRouter.put(
  "/:id",
  (req, res, next) => verifyRole(req, res, next, ["admin", "premium"]),
  updateProduct
);
productsRouter.delete(
  "/:id",
  (req, res, next) => verifyRole(req, res, next, ["admin", "premium"]),
  deleteProduct
);

export default productsRouter;
