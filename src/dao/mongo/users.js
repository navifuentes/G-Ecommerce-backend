import { userModel } from "../models/users.js";

export default class User {
  constructor() {}

  getUsers = async () => {
    try {
      const users = await userModel.find({});
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getUser = async (query) => {
    try {
      const user = await userModel.findOne(query);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createUser = async (user) => {
    try {
      const result = await userModel.create(user);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateUser = async (id, update) => {
    try {
      const result = await userModel
        .findByIdAndUpdate(id, update, {
          new: true,
        })
        .lean();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteUser = async (id) => {
    try {
      const result = await userModel.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
