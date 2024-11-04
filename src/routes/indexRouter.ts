import router from "express-promise-router";
import type { Router, Request, Response, NextFunction } from "express";

const indexRouter = router();

export default (app: Router) => {
  app.use("/", indexRouter);
};

indexRouter.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("GET /"),
);
