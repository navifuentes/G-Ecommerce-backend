import jwt from "jsonwebtoken";
import config from "../config/config.js";

const {
  jwt: { secret },
} = config;

export const checkLogged = (req, res, next) => {
  const { userCookie } = req.cookies;
  console.log("cookie from auth.js", userCookie);
  if (userCookie) {
    const decodedToken = jwt.verify(userCookie, secret, {
      ignoreExpiration: true,
    });
    return res.redirect("/").send(decodedToken);
  } else {
    next();
  }
};
export const verifyRole = (req, res, next, rolesArray) => {
  const { userCookie } = req.cookies;

  if (!userCookie) {
    throw new Error(`User cookie not found :O`);
  }
  const { role } = jwt.verify(userCookie, secret);

  if (!rolesArray.includes(role)) {
    throw new Error("No role authorization");
  }
  next();
};
