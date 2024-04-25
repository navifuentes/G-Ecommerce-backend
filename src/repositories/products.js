import { productDao } from "../dao/mongo/index.js";

export default class ProductsRepository {
  getProducts = async () => {
    try {
      const products = await productDao.getProducts();
      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getProduct = async (id) => {
    try {
      const product = await productDao.getProduct(id);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  checkProduct = async (query) => {
    try {
      const product = await productDao.checkProduct(query);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createProduct = async (product) => {
    try {
      const result = await productDao.createProduct(product);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateProduct = async (id, update) => {
    try {
      const result = await productDao.updateProduct(id, update);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updoteStock = async (id, qty) => {
    try {
      const result = await productDao.updateStock(id, qty);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteProduct = async (id) => {
    try {
      const result = await productDao.deleteProduct(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
