const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method==="OPTIONS"){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
});
app.use(upload.array());
app.use(express.static('public'));
let routes = require('./routers/main') //importing route
const fs = require('fs');
routes(app)
const uploadImage = async (req, res, next) => {
 
    try {
 
        // to declare some path to store your converted image
        const path = './uploads/'+Date.now()+'.png'
 
        const imgdata = req.body.base64image;
 
        // to convert base64 format into random filename
        const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        
        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
 
        return res.send(path);
 
    } catch (e) {
        next(e);
    }
}
 
app.post('/upload/image', uploadImage)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
module.exports = app;