const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(express.static('public'));


//Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    console.log('Chat socket connected! id: ', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing',data);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});
