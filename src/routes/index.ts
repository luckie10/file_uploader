import { Router } from "express";

import indexRouter from "./indexRouter";
import userRouter from "./userRouter";

export default () => {
  const router = Router();

  indexRouter(router);
  userRouter(router);

  return router;
};
