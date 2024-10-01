import express, { type Express } from "express";
import "dotenv/config";

const PORT = process.env.PORT || 5173;
const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
