import { Response } from "express";

export default function (req, res: Response, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/user/login");
}
