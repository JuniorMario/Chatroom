const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const router = express.Router();
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const msgs = [];
let online = [];

io.on("connection", (socket) => {
  console.log(`Connected from ${socket.id}`);

  socket.join('some room')
  const welcome = {
    msgs,
    online,
  }
  io.in('some room').emit('welcome', welcome);

  socket.on('online', (data) => {
    online.push({ user: data })
    io.in('some room').emit('online', online);

  });

  socket.on('remove', (data) => {
    online = online.filter(item => item.user != data)
    io.in('some room').emit('online', online);
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });


  socket.on('msg', (data) => {
    msgs.push(data);
    io.in('some room').emit('mensagens', msgs)
  });
});


server.listen(port, () => console.log(`Listening on port ${port}`));