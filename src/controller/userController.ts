import { body, validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

import type { Request, Response, NextFunction } from "express";
import { createUser, findUser } from "@/db/user";

export const register_get = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.render("register_form", { username: null });
};

export const validateRegisterInput = [
  body("username")
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Username must be specified.")
    .isAlphanumeric()
    .withMessage("Username has non-alphanumeric characters."),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password should be at least 5 characters.")
    .escape(),
  body("confirm_password")
    .trim()
    .escape()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

export const register_post = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("register_form", {
      username,
      errors: errors.array(),
    });
  }

  bcryptjs.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      // TODO: send to internal error page
      console.log(err);
      return;
    }

    const result = await createUser({
      username,
      password: hashedPassword,
    });
    if (result.isErr()) {
      return res.render("register_form", {
        username,
        errors: [{ msg: result.error.message }],
      });
    }

    return res.send("Registration successful!!");
  });
};

