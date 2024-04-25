import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import database from "./config/db.js";
import config from "./config/config.js";
import initializePassport from "./auth/passport.js";

import routerApi from "./routes/index.js";

// Initialization
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("dist"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
initializePassport();

database.connect();

routerApi(app);

app.listen(config.port, (req, res) => {
  console.log(`Listening on port ${config.port}`);
});
