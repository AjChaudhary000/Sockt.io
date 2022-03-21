const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')
const socketio = require("socket.io");
app.use(cors())
const mongoose = require('mongoose');
const userrouter = require('./router/userrouter');
mongoose.connect("mongodb://127.0.0.1:27017/ChatApp");
app.get('/', (req, res) => res.send('Hello World!'))
app.use(userrouter);
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const io = socketio(server)
const myMessge = [];
io.on("connect", (socket) => {
    //  console.log("my data ")
    socket.emit("welcome", "welcome to react Native")
    socket.join("Native")
    socket.on("sendMessage", (data) => {
        myMessge.push(data)
        io.to(data.room).emit("message", myMessge)
        console.log(myMessge)
    })

})
