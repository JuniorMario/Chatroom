const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const msgs = [];
const online = [];

io.on("connection", (socket) => {
  console.log(`Connected from ${socket.id}`);

  socket.join('some room')
  io.in('some room').emit('welcome', msgs);
  io.in('some room').emit('online', online);


  socket.on('online', (data) => {
    online.push({ user: data})
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });


  socket.on('msg', (data) => {
    msgs.push(data);
    io.in('some room').emit('mensagens', msgs)
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));