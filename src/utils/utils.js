//import { fileURLToPath } from "url"
//import {dirname} from "path"
import bcrypt from "bcrypt";

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(9));

export const validatePassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
