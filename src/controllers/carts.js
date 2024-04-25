import { cartsService } from "../services/index.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    return res.status(200).send({ status: "Success", payload: carts });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartsService.getCart(id);
    if (!(cart && id)) {
      return res.status(404).send({ status: "Error", error: "Cart not found" });
    }
    return res.status(200).send({ status: "Success", payload: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const getProductsFormated = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartsService.getProductsFormated(id);
    if (!(result && id)) {
      return res.status(404).send({ status: "Error", error: "Cart not found" });
    }
    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const purchase = async (req, res) => {
  try {
    const {
      params: { cid },
      body,
    } = req;
    //
    if (!(cid && body))
      return res
        .status(404)
        .send({ status: "Error", error: "Cart not found or missing info" });

    const result = await cartsService.purchase(cid, body);
    if (!result)
      return res
        .status(400)
        .send({ status: "Error", error: "Could not complete purchase :(" });

    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const createCart = async (req, res) => {
  try {
    const cart = await cartsService.createCart();
    if (!cart) {
      return res
        .status(404)
        .send({ status: "Error", error: "Cart couldn't be created" });
    }
    return res.status(200).send({ status: "Success", payload: cart });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const addToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const { userCookie } = req.cookies;

    if (!(cid || pid)) {
      throw new Error(`Product or Cart ID missing`);
    }
    const result = await cartsService.addToCart(cid, pid, quantity, userCookie);
    if (!result) throw new Error(`Cant add your own products`);
    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const updateCart = async (req, res) => {
  try {
    const { cid } = req.params;

    console.log("cid in ctrl", cid);
    const { body } = req;
    console.log("update", body);
    if (!(cid && body)) {
      return res.status(404).send({ status: "Error", error: "Cart not found" });
    }
    const result = await cartsService.updateCart(cid, body);
    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const removeProduct = async (req, res) => {
  const { cid, pid } = req.params;
  if (!(cid && pid))
    return res
      .status(400)
      .send({ status: "Error", error: "Invalid cart or product ID" });

  try {
    const result = await cartsService.removeProduct(cid, pid);
    return res.status(200).send({ status: "Success", payload: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartsService.deleteCart(id);
    if (!(id && result)) {
      return res.status(404).send({ status: "Error", error: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
