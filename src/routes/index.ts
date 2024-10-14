import { Router } from "express";

import indexRouter from "./indexRouter";

export default () => {
  const router = Router();

  indexRouter(router);

  return router;
};
