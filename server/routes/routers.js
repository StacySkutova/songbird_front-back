import express from "express";
import { check } from "express-validator";

import controller from "../controllers/controllers.js";

const router = express.Router();

router.post(
  "/registration",
  [
    check("username", "Username field can not be empty").notEmpty(),
    check("email", "Email field can not be empty").notEmpty().isEmail(),
    check(
      "password",
      "Password field should be at least 5 characters and not more than 10"
    ).isLength({ min: 5, max: 10 }),
  ],
  controller.registration
);
router.post(
  "/login",
  [
    check("email", "Email field can not be empty").notEmpty().isEmail(),
    check("password", "Password field can not be empty").notEmpty().exists(),
  ],
  controller.login
);

export default router;
