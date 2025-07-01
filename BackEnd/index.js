import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import route from "./routes/routes.js";
import cookieParser from "cookie-parser";

//socket
import { createServer } from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Server } from "socket.io";

const app = express();

//socket bot
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/LetChat", (req, res) => {
  res.sendFile(join(__dirname, "socket/index.html"));
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message:", msg);
  });
});
//SOCKET top
configDotenv();

const port = process.env.PORT;

server.listen(port, () => {
  console.log(`server is starting at ${port}`);
});

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//route
app.use("/", route);

//if no route matched
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
