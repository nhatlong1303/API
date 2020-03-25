
const http=require('http');

const port = process.env.PORT || 3000
const app =require('./app');
const server=http.createServer(app);

server.listen(port);
console.log('RESTful API server started on: ' + port)
// const express = require('express')
// const app = express()
// const bodyParser = require('body-parser')
// require('dotenv').config()

// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// let routes = require('./routes') //importing route

// routes(app)

// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
// })

// app.listen(port)

// console.log('RESTful API server started on: ' + port)