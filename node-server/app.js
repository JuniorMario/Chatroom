const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const session = require('express-session')
const redis = require('redis');
const redisStore = require('connect-redis')(session);

const router = express.Router();
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


var sessionStore = new redisStore({ host: 'redis', port: 6379, client: redis.createClient(process.env.REDIS_URL), ttl: 86400 })

app.use(session({
  secret: 'chatRooMsEssion',
  name: '_redis_chatroom_session_',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: sessionStore,
}));


app.post('/login', function(req, res) {
  console.log('request')
  req.session.user = req.body.username
  req.session.save()
})

app.get('/me', function(req, res) {
  console.log('was request')
  return res.status(200).json({user: 'hhaha'});
});

server.listen(port, () => console.log(`Listening on port ${port}`));