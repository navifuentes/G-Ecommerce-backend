import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local";

import config from "../config/config.js";
import { createHash } from "../utils/utils.js";
import { cartsService, usersService } from "../services/index.js";

const {
  admin: { mail },
  jwt: { cookieName, secret },
} = config;

const cookieExtractor = (req) => {
  let token = null;
  req && req.cookies ? (token = req.cookies[cookieName]) : null;
  return token;
};

const LocalStrategy = localStrategy.Strategy;
const JwtStrategy = jwt.Strategy;

const jwtOptions = {
  secretOrKey: secret,
  jwtFromRequest: cookieExtractor,
};

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { first_name, last_name, age } = req.body;
          let { role } = req.body;

          const userExists = await usersService.checkUserExists(username);

          if (userExists) {
            console.log("User already exists");
            return done(null, false);
          }
          const cart = await cartsService.createCart();
          const newUser = {
            first_name,
            last_name,
            age,
            email: username,
            password: createHash(password),
            role: username === `${mail}` ? (role = "admin") : (role = "user"),
            cart: cart._id,
          };
          const result = await usersService.createUser(newUser);
          return done(null, result);
        } catch (error) {
          return done(null, false);
        }
      }
    )
  );

  passport.use(
    "jwt",
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        return done(null, jwt_payload);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default initializePassport;
