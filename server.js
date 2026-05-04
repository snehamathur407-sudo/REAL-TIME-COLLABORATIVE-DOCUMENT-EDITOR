const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let document = "";

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("load-document", document);

  socket.on("send-changes", (data) => {
    document = data;
    socket.broadcast.emit("receive-changes", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});