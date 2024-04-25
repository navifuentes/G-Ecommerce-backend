import { usersRepository } from "../repositories/index.js";
import UserDto from "../dao/dtos/user.dto.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default class UsersService {
  decoded = async (token) => {
    console.log(token);
    try {
      const decodedToken = jwt.verify(token, config.jwt.secret, {
        ignoreExpiration: true,
      });
      return decodedToken;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getUsers = async () => {
    try {
      const users = await usersRepository.getUsers();
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  getUser = async (email) => {
    try {
      const user = await usersRepository.getUser(email);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  createUser = async (user) => {
    try {
      const result = await usersRepository.createUser(user);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  changeRole = async (uid) => {
    try {
      const user = await usersRepository.getUser({ _id: uid });

      if (!user) {
        return null;
      }
      const role = user.role === "user" ? "premium" : "user";

      const roleChanged = await usersRepository.updateUser(uid, { role });
      return roleChanged;
    } catch (error) {
      throw error;
    }
  };
  checkUserExists = async (email) => {
    try {
      const user = await usersRepository.getUser(email);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
    /* try {
      const userExists = await usersRepository.getUser(email);
      console.log("User exists in serv:", userExists);
      if (user) throw new Error(`User with email ${email} already exists`);
      return userExists;
    } catch (error) {
      throw error;
    }  */
  };
  loginUser = async (user, rememberMe) => {
    try {
      const userDto = new UserDto(user);
      const expireTime = rememberMe ? "7d" : "3h";
      const token = jwt.sign({ ...userDto }, config.jwt.secret, {
        expiresIn: expireTime,
      });
      return token;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  updateUser = async (id, update) => {
    try {
      const result = await usersRepository.updateUser(id, update);
      const userDto = new UserDto(result);
      return userDto;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  deleteUser = async (id) => {
    try {
      const result = await usersRepository.deleteUser(id);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
