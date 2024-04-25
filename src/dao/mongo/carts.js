import { cartModel } from "../models/carts.js";
import { productModel } from "../models/products.js";

export default class Cart {
  constructor() {}

  addToCart = async (cid, pid, qty) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
      const productExists = cart.products.findIndex((p) => {
        return p.productId._id.toString() === pid;
      });

      if (productExists !== -1) {
        await cartModel.updateOne(
          { _id: cid, "products.productId": pid },
          { $inc: { "products.$.quantity": qty || 1 } }
        );
        /* await productModel.updateOne({ _id: pid }, { $inc: { stock: -1 } }); */
        const resultCart = await cartModel.findOne({ _id: cid });
        return resultCart;
      } else {
        const productToCart = {
          productId: pid,
          quantity: qty || 1,
        };
        await cartModel.updateOne(
          { _id: cid },
          { $push: { products: productToCart } }
        );
        const resultCart = await cartModel.findOne({ _id: cid });
        return resultCart;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getCarts = async () => {
    try {
      const carts = await cartModel.find({});
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getCart = async (id) => {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createCart = async () => {
    try {
      const cart = await cartModel.create({
        products: [],
      });
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateCart = async (id, update) => {
    try {
      const result = await cartModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  removeProduct = async (cid, pid) => {
    try {
      const result = await cartModel.findByIdAndUpdate(
        cid,
        { $pull: { products: { productId: { $in: pid } } } },
        { new: true }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteCart = async (id) => {
    try {
      const result = await cartModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
