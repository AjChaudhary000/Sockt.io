const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

const socketio = require("socket.io");
app.use(cors())
const mongoose = require('mongoose');
const userrouter = require('./router/userrouter');
const convesstionrouter = require('./router/convesstionrouter');
const chatroomrouter = require('./router/chatroomrouter');
mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = socketio(server)
app.get('/', (req, res) => res.send('Hello World!'))
app.use(chatroomrouter);
app.use(userrouter);
app.use(convesstionrouter);

module.exports = { io }