import { usersService } from "../services/index.js";
//import bcrypt from "bcrypt";
import { validatePassword } from "../utils/utils.js";
import config from "../config/config.js";

export const loginUser = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await usersService.getUser({ email: email });
    const isPassword = user === null ? false : validatePassword(user, password);

    if (!(user && isPassword)) {
      return res.status(401).json({ error: "invalid credentials" });
    }
    const token = await usersService.loginUser(user, rememberMe);

    if (!token) {
      return res.status(500).send({
        status: "Error",
        error: "Failed to generate JWT token",
      });
    }
    const { password: pass, ...rest } = user._doc;

    return res
      .cookie(config.jwt.cookieName, token, { httpOnly: true })
      .send({ status: "Success", payload: rest });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: "Login failed" });
  }
};
export const logOutUser = async (req, res) => {
  return res
    .clearCookie(config.jwt.cookieName)
    .send({ status: "Success", message: "logged out" });
};
export const failRegister = async (req, res) => {
  return res
    .status(409)
    .send({ status: "Error", error: "User already exists" });
};
export const changeRole = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).send({
        status: "Error",
        error: "Incomplete values",
      });
    }
    const userPromote = await usersService.changeRole(uid);
    if (!userPromote) {
      return res
        .status(500)
        .send({ status: "Error", error: "Failed to change role" });
    }

    return res.status(200).send({
      status: "Success",
      payload: userPromote,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const verifyRole = async (req, res) => {};

export const currentUser = async (req, res) => {
  return res.status(200).send({ status: "Success", payload: req.user });
};
export const getUsers = async (req, res) => {
  const users = await usersService.getUsers();
  return res.send({ status: "Success", payload: users });
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const user = await usersService.getUser(id);
  if (!(id && user))
    return res.status(404).send({ status: "Error", error: "User nnot found" });

  return res.send({ status: "Success", payload: user });
};
export const createUser = async (req, res) => {
  try {
    return res
      .status(201)
      .send({ status: "Success", message: "User registered" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: "Error", error: error });
  }
};
export const updateUser = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  //console.log("user", user);
  if (!(id && body))
    return res.status(403).send({ status: "Error", error: "Missing info" });
  /* if (user.id !== id)
    return res
      .status(401)
      .send({ status: "Error", error: "Can only update your own account" }); */

  const result = await usersService.updateUser(id, body);
  if (!result)
    return res.status(404).send({ status: "Error", error: "User not found" });
  
  return res.status(200).send({ status: "Success", payload: result });
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const result = await usersService.deleteUser(id);
  return result;
};

/* export const decoded = async (req, res) => {
  const { userCookie } = req.cookies;
  console.log("req.cookies", req.cookies);
  console.log("usercookie contrl:", userCookie);
  if (!userCookie)
    return res.status(404).send({ status: "Error", error: "Cookie not found" });

  const result = await usersService.decoded(userCookie);
  return res.status(200).send(result);
};
 */
