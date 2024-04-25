import mongoose from "mongoose";

const usersCollection = "users";

const usersSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: String,
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
    },
    role: {
      type: String,
      enum: ["admin", "premium", "user"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FProfile.png&f=1&nofb=1&ipt=925dbc9176e1c9c283df7885f860557710f23987e550fa349ee9a85efbf4cead&ipo=images",
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model(usersCollection, usersSchema);
