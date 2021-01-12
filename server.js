const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const server = require('http').Server(app);
const io = require('socket.io')(server)
app.use(express.static('public')); //public folder (script file)
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //redirects the user to their room ID
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }); //renders the room
})

io.on('connection', socket => {
    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected'); //broadcasting that the user it's connecting
    })
})

server.listen(3030);