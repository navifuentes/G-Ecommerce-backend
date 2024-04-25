import { Router } from "express";
import {
  getUsers,
  getUser,
  currentUser,
  createUser,
  changeRole,
  updateUser,
  deleteUser,
  loginUser,
  logOutUser,
  failRegister,
} from "../controllers/users.js";
import passport from "passport";
import { verifyRole } from "../middleware/auth.js";

const usersRouter = Router();

//GET
usersRouter.get("/", getUsers);
usersRouter.get("/logout", logOutUser);
usersRouter.get("/failRegister", failRegister);
usersRouter.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => verifyRole(req, res, next, ["user", "admin", "premium"]),
  currentUser
);

//POST
usersRouter.post("/login", loginUser);
usersRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/users/failRegister",
  }),
  createUser
);

//PUT
usersRouter.put("/:id", updateUser);
usersRouter.put(
  "/promote/:uid",
  passport.authenticate("jwt", { session: false }),
  changeRole
);

//DELET
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
