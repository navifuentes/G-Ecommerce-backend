import dotenv from "dotenv";
dotenv.config();

export default {
  admin: {
    AdminMail: process.env.ADMIN_EMAIL,
  },
  mongo: {
    url: process.env.DB_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    cookieName: process.env.COOKIE_NAME,
  },
  port: process.env.PORT,
};
