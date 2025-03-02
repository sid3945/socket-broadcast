import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});


app.use(cors());
app.use(express.json());


io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  socket.on("send_message", (data) => {
    console.log("Received message: ", data);
    io.emit("message", data);
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
