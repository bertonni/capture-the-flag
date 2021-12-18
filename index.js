const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 8000;

const clients = [];

app.get('/', (req, res) => {
  console.log('newPath', newPath);
  res.sendFile(__dirname + '\\index.html');
});

io.on('connection', (socket) => { 
  if (clients.length < 2) {
    if (!clients.includes(socket.id)) clients.push(socket.id);
    else return;
  } else {
    console.log('Maximum clients reached');
  }

  socket.on('disconnect', () => {
    if (clients.includes(socket.id)) {
      const index = clients.indexOf(socket.id);
      if (index > 0) clients.pop();
      else clients.shift();
    }
  })

  socket.on('move', (move) => {
    console.log('player', move);
    
    if (move.id === clients[0]) {
      move.team = 'blue';
    } else if (clients.length === 2 && move.id === clients[1]) {
      move.team = 'red';
    }
    io.emit('move', move);
  });
})

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));