import { productsService } from "../services/index.js";

export const getProducts = async (req, res) => {
  const products = await productsService.getProducts();
  return res.status(200).send({ status: "Success", payload: products });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProduct(id);
  if (!(product && id)) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product not found" });
  }
  return res.status(200).send({ status: "Success", payload: product });
};

export const createProduct = async (req, res) => {
  const { body } = req;
  const { userCookie } = req.cookies;
  const result = await productsService.createProduct(body, userCookie);
  if (!(body && result)) {
    return res.status(400).send({
      status: "Error",
      error: "Error, the product could not be added",
    });
  }
  return res.send({
    status: "Success",
    message: "Product added successfully",
    payload: result,
  });
};
export const updateProduct = async (req, res) => {
  const {
    params: { id },
    body,
    cookies: { userCookie },
  } = req;

  const result = await productsService.updateProduct(id, body, userCookie);
  if (!(id && body)) {
    return res.status(404).send({
      status: "Error",
      error: "Missing product id or info",
    });
  } else if (!result) {
    return res.status(404).send({
      status: "Error",
      error: "Product not found",
    });
  }

  return res.status(200).send({ status: "Success", payload: result });
};
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const result = productsService.deleteProduct(id);
  if (!(id && result))
    return res
      .status(404)
      .send({ status: "Error", error: "missing product id" });
  return res.status(200).send({ status: "Success", payload: result });
};
