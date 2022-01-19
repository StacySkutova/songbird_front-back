import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const User = new Schema({
  username: { type: String, unique: true, require: true },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

export default model("User", User);
