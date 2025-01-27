import router from "express-promise-router";
import type { Router, Request, Response } from "express";
import isAuth from "@/middlewares/isAuth";
import multer from "multer";

import {
  index_get,
  createFolder_post,
  deleteFolder_get,
  deleteFolder_post,
  updateFolder_get,
  updateFolder_post,
  folderDetails_get,
  fileUpload_post,
} from "@/controller/indexController";

const upload = multer({ dest: "src/uploads" });

const indexRouter = router();

indexRouter.use(isAuth);

export default (app: Router) => {
  app.use("/", indexRouter);
};

indexRouter.get("/", index_get);

indexRouter.get("/folder/delete/:id", deleteFolder_get);
indexRouter.post("/folder/delete/:id", deleteFolder_post);
indexRouter.get("/folder/update/:id", updateFolder_get);
indexRouter.post("/folder/update/:id", updateFolder_post);
indexRouter.post("/folder/create", createFolder_post);
indexRouter.get("/folder/:id", folderDetails_get);

indexRouter.post("/file/upload", upload.single("file"), fileUpload_post);
