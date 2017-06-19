const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, () => console.log('Listening to requests on localhost:4000') );

app.use(express.static('public'));


//Socket setup
const io = socket(server);

io.on('connection', socket => {
    console.log('Chat socket connected! id: ', socket.id);

    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', data => {
        socket.broadcast.emit('typing',data);
    });
});
