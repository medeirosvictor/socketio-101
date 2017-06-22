const express = require('express');
const socket = require('socket.io');
const path = require('path');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use(express.static('public'));


//Socket setup
const io = socket(server);

io.on('connection', (socket) => {
    socket.on('join', ()=> {
        console.log('User has logged in!');
    })

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing',data);
    });

    socket.on('disconnect', () => console.log('Client disconnected'));
});
