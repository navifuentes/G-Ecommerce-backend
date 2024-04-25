import { productModel } from "../models/products.js";

export default class Product {
  constructor() {}

  getProducts = async () => {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getProduct = async (id) => {
    try {
      const product = await productModel.findById(id);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  checkProduct = async (query) => {
    try {
      const product = await productModel.findOne(query);
      return product;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createProduct = async (product) => {
    try {
      const result = await productModel.create(product);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateProduct = async (id, update) => {
    try {
      const result = await productModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateStock = async (id, qty) => {
    try {
      let result = await productModel.findByIdAndUpdate(
        id,
        {
          $inc: { stock: -qty },
        },
        { new: true }
      );
      if (result.stock === 0) {
        result = await productModel.findByIdAndUpdate(
          id,
          {
            status: false,
          },
          { new: true }
        );
      }
      if (result.stock > 0) {
        result = await productModel.findByIdAndUpdate(
          id,
          {
            status: true,
          },
          { new: true }
        );
      }
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteProduct = async (id) => {
    try {
      const result = await productModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
