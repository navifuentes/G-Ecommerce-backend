import config from "../config/config.js";
import {
  cartsRepository,
  productsRepository,
  ticketsRepository,
  usersRepository,
} from "../repositories/index.js";
import ProductDto from "../dao/dtos/product.dto.js";
import jwt from "jsonwebtoken";

const {
  jwt: { secret },
} = config;

export default class CartsService {
  addToCart = async (cid, pid, qty, token) => {
    try {
      const { email } = jwt.verify(token, secret, {
        ignoreExpiration: true,
      });
      const { owner } = await productsRepository.getProduct(pid);
      if (email === owner) {
        throw new Error(`Can't add your own products`);
      }
      const productToCart = await cartsRepository.addToCart(cid, pid, qty);
      return productToCart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getCarts = async () => {
    try {
      const carts = await cartsRepository.getCarts();
      return carts;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getCart = async (cid) => {
    try {
      const cart = await cartsRepository.getCart(cid);
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getProductsFormated = async (cid) => {
    try {
      const products = await productsRepository.getProducts();
      const cart = await cartsRepository.getCart(cid);
      const productsInCart = [];

      products.map((product) => {
        const productFound = cart.products.find(
          (p) => p.productId.toString() === product._id.toString()
        );
        if (productFound) {
          productsInCart.push(new ProductDto(product, productFound));
        }
      });

      return {
        cartId: cid,
        cartTotal: productsInCart.reduce((acc, prod) => acc + prod.total, 0),
        products: productsInCart,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  purchase = async (cid, body) => {
    try {
      const cart = await this.getProductsFormated(cid);
      const users = await usersRepository.getUsers();
      const products = await productsRepository.getProducts();
      const foundUser = users.find((u) => u.cart.toString() === cart.cartId);
      const newTicket = {
        products: [...cart.products],
        total: cart.cartTotal,
        client: {
          clientId: foundUser._id,
          email: foundUser.email,
          ...body,
        },
      };
      // REMOVE STOCK
      cart.products.map(async (product) => {
        const matchProduct = products.find(
          (p) => p._id.toString() === product.id.toString()
        );
        if (matchProduct) {
          await productsRepository.updoteStock(
            matchProduct._id,
            product.quantity
          );
        }
      });

      const ticket = await ticketsRepository.createTicket(newTicket);
      await cartsRepository.updateCart(cid, { products: [], cartTotal: 0 });
      return ticket;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createCart = async () => {
    try {
      const cart = await cartsRepository.createCart();
      return cart;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateCart = async (cid, update) => {
    try {
      const result = await cartsRepository.updateCart(cid, update);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  removeProduct = async (cid, pid) => {
    try {
      const result = await cartsRepository.removeProduct(cid, pid);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteCart = async (id) => {
    try {
      const result = await cartsRepository.deleteCart(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
