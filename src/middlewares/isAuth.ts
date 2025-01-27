import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.log("Authenticating...");
  if (req.isAuthenticated()) return next();
  res.redirect("/user/login");
}
