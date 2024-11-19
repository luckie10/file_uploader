import "module-alias/register";
import express from "express";
import path from "path";

import config from "./config";
import routes from "./routes";
import sessionConfig from "@/config/session";
import passport from "@/config/passport";

const app = express();

app.set("views", path.join(import.meta.dirname, "view"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes());

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
