const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(__dirname + '/public'));

io.on('connection', socket => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('movePaddle', newPosition => {
    io.emit('updatePaddlePosition', newPosition);
  });

  socket.on('moveBall', newPosition => {
    io.emit('updateBallPosition', newPosition);
  });

  socket.on('gameOver', () => {
    io.emit('gameOver');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
