import "module-alias/register";

import config from "./config";
import express from "express";
import routes from "./routes";
import sessionConfig from "./config/session";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sessionConfig);

app.use("/", routes());

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
