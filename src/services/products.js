import { productsRepository } from "../repositories/index.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
  jwt: { secret },
  admin: { AdminMail },
} = config;
export default class ProductsService {
  getProducts = async () => {
    try {
      const products = await productsRepository.getProducts();
      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getProduct = async (id) => {
    try {
      const product = await productsRepository.getProduct(id);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createProduct = async (product, token) => {
    try {
      const { title, code } = product;
      const titleExists = await productsRepository.checkProduct({
        title: title,
      });
      const codeExists = await productsRepository.checkProduct({ code: code });
      if (titleExists || codeExists) {
        throw new Error(`Error, product with already exists`);
      }

      const { role, email } = jwt.verify(token, secret, {
        ignoreExpiration: true,
      });
      role === "premium" ? (product.owner = email) : null;

      const result = await productsRepository.createProduct(product);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateProduct = async (id, update, token) => {
    try {
      const { email } = jwt.verify(token, secret, {
        ignoreExpiration: true,
      });
      const { owner } = await productsRepository.getProduct(id);
      if (owner !== email || owner !== AdminMail)
        throw new Error("Error, cannot update products you dont own");

      const result = await productsRepository.updateProduct(id, update);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteProduct = async (id) => {
    try {
      const result = await productsRepository.deleteProduct(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
