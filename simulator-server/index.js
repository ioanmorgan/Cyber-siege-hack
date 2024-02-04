const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

io.on('connection', (socket) => {
  console.log('A client connected');

  // Simulate load data
  setInterval(() => {
    const load = Math.floor(Math.random() * 100) + 1;
    socket.emit('loadData', { load });
  }, 1000);

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Simulator Server listening on port ${PORT}`);
});
