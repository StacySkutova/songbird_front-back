import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwtToken from "jsonwebtoken";
import "dotenv/config";

import User from "../models/modelUser.js";

const SECRET = process.env.SECRET;
const HASH_COMPLEXITY_NUMBER = 7;

class controllers {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Errors during registration",
          errors: errors.array(),
        });
      }
      const { username, email, password } = req.body;
      const candidate = await User.findOne({ username, email });
      if (candidate) {
        return res.status(300).json({ message: "Such user already exists" });
      }
      const hashPassword = bcrypt.hashSync(password, HASH_COMPLEXITY_NUMBER);
      const user = await new User({ username, email, password: hashPassword });
      await user.save();
      return res.status(201).json({ message: "User has been created" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Errors during registration" });
    }
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Errors during login", errors: errors.array() });
      }
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Such user has been not found" });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res
          .status(400)
          .json({ message: "Password has been entered incorrectly" });
      }
      const token = jwtToken.sign({ userId: user._id }, SECRET, {
        expiresIn: "1h",
      });
      return res.json({
        token,
        userId: user._id,
        email: user.email,
        password: user.password,
      });
    } catch (err) {
      console.log(err);
    }
  }
}

const controller = new controllers();
export default controller;
