import mongoose from "mongoose";
import config from "../config/config.js";

const { mongo } = config;

const database = {
  connect: async () => {
    try {
      await mongoose.connect(mongo.url);
    } catch (error) {
      console.log(error);
    }
  },
};

export default database;
