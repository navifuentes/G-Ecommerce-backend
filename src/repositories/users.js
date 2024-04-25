import { userDao } from "../dao/mongo/index.js";

export default class UsersRepository {
  getUsers = async () => {
    try {
      const users = await userDao.getUsers();
      return users;
    } catch (error) {
      console.log(error);
    }
  };
  getUser = async (query) => {
    try {
      const user = await userDao.getUser(query);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createUser = async (user) => {
    try {
      const result = await userDao.createUser(user);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateUser = async (id, update) => {
    try {
      const result = await userDao.updateUser(id, update);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteUser = async (id) => {
    try {
      const result = await userDao.deleteUser(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
