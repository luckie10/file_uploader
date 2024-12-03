import router from "express-promise-router";
import type { Router, Request, Response, NextFunction } from "express";
import isAuth from "@/middlewares/isAuth";
import multer from "multer";

const upload = multer({ dest: "src/uploads" });

const indexRouter = router();

export default (app: Router) => {
  app.use("/", indexRouter);
};

indexRouter.get(
  "/",
  isAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("index");
  },
);

indexRouter.post(
  "/",
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("File: ", req.file);
    console.log("Body: ", req.body);
    res.send(`${req.file.originalname} was uploaded.`);
  },
);
