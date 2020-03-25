const db = require('../db')
var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');
module.exports = {
    signUp: (req, res) => {
        var userName = req.body.userName;
        var password = req.body.password;
        // var dec_pass = atob(password);
        // var encrypted_pass = cryptr.encrypt(dec_pass);
        let data = [[userName, password]];

        let sql = 'INSERT INTO user (userName,password) VALUES  ?'
        db.query(sql, [data], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'signUp success!',
                    code: 200,
                })
            }
        })
    },
    signIn: (req, res) => {
        var userName = req.body.userName;
        var password = req.body.password;
        // var dec_pass =atob(password);
        // var encrypted_pass = cryptr.decrypt(dec_pass);
        let sql = 'SELECT * FROM user WHERE  userName=? AND password=?'
        db.query(sql, [[userName], [password]], (err, response) => {
            console.log(response)
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                var data = JSON.stringify(response);
                var secret = 'TOPSECRETTTTT';
                var now = Math.floor(Date.now() / 1000),
                    iat = (now - 10),
                    expiresIn = 3600,
                    expr = (now + expiresIn),
                    notBefore = (now - 10),
                    jwtId = Math.random().toString(36).substring(7);
                var payload = {
                    iat: iat,
                    jwtid: jwtId,
                    audience: 'TEST',
                    data: data
                };
                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn : expiresIn}, function(err, token) {
                    if(err){
                        console.log('Error occurred while generating token');
                        console.log(err);
                        return false;
                    }
                     else{
                    if(token != false){
                        //res.send(token);
                        res.header();
                        res.json({
                            success: true,
                            message: 'signIn success!',
                            code: 200,
                            data : response,
                            token : token,
                        })
                        res.end();
                    }
                    else{
                        res.send("Could not create token");
                        res.end();
                    }
                    
                     }
                });
            }
        })
    },


}