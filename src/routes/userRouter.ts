import router from "express-promise-router";
import type { Router } from "express";

import {
  register_get,
  register_post,
  validateRegisterInput,
  validateLoginInput,
  login_get,
  login_post,
} from "@/controller/userController";
const userRouter = router();

export default (app: Router) => {
  app.use("/user", userRouter);
};

userRouter.get("/register", register_get);
userRouter.post("/register", validateRegisterInput, register_post);
userRouter.get("/login", login_get);
userRouter.post("/login", validateLoginInput, login_post);
