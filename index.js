import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import route from "./routes/routes.js";
import cookieParser from "cookie-parser";

const app = express();
configDotenv();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is starting at ${port}`);
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
app.use("/", route);

//if no route matched
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});
