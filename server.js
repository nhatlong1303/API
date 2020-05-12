
const http = require('http');

const port = process.env.PORT || 3000
const app = require('./app');
const server = http.createServer(app);
const io = require('socket.io')(server);
server.listen(port);

io.on("connection", function (socket) {
    socket.on('sendTest', function (data) {
        socket.emit('test', data)
    })
})


console.log('RESTful API server started on: ' + port)
