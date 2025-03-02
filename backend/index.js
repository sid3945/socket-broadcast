import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND,
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());

const SEND_MESSAGE = "send_message";
const RECEIVE_MESSAGE = "receive_message";

io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on(SEND_MESSAGE, (data) => {
    console.log("Received message: ", data);
    io.emit(`${RECEIVE_MESSAGE}`, data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
