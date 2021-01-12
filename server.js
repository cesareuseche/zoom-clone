const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const server = require('http').Server(app);

app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`); //redirects the user to their room ID
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room }); //renders the room
})



server.listen(3030);