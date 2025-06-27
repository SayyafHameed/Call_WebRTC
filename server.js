const express = require('express');
const socketIo = require('socket.io');
const path = require('path');   
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.redirect('/login.html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

const io = socketIo(server);
const roomHosts = {};
const roomUsers = {};   
io.on('connection', (socket) => {
    console.log('A user connected', socket.id);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    socket.on('join-room', (roomId, userId, role) => {
        console.log(`${role} === 'host' ? 'host' : 'user'} User ${userId} joining room ${roomId}`);
        socket.join(roomId);
    });
});