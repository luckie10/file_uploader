import router from "express-promise-router";
import type { Router, Request, Response, NextFunction } from "express";

const route = router();

export default (app: Router) => {
  app.use("/", route);
};

route.get("/", async (req: Request, res: Response, next: NextFunction) =>
  res.send("GET /"),
);
