
const http=require('http');

const port = process.env.PORT || 3000
const app =require('./app');
const server=http.createServer(app);
const io=require('socket.io')(server);
server.listen(port);

io.on("connection",function(socket){
    console.log('có người vừa kết nối')
    socket.on('sendTest',function(data1){
        console.log(data1)
    })
})


console.log('RESTful API server started on: ' + port)
