const express = require('express');
const app = express();
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid');
const server = require('http').Server(app);
app.use(express.static('public')); //public folder (script file)
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //redirects the user to their room ID
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }); //renders the room
})

io.on('connection', socket => {
    socket.on('join-room', () = {
        console.log("joined room");
    })
})

server.listen(3030);