import { cartDao } from "../dao/mongo/index.js";

export default class CartsRepository {
  addToCart = async (cid, pid, qty) => {
    try {
      const cart = await cartDao.addToCart(cid, pid, qty);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getCarts = async () => {
    try {
      const carts = await cartDao.getCarts();
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getCart = async (id) => {
    try {
      const cart = await cartDao.getCart(id);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createCart = async () => {
    try {
      const cart = cartDao.createCart();
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateCart = async (cid, update) => {
    try {
      const result = cartDao.updateCart(cid, update);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  removeProduct = async (cid, pid) => {
    try {
      const result = cartDao.removeProduct(cid, pid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteCart = async (id) => {
    try {
      const result = cartDao.deleteCart(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
