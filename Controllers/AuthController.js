const db = require('../db')
var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
module.exports = {
    signUp: (req, res) => {
        var name = req.body.name;
        var password = req.body.password;
        // var dec_pass = atob(password);
        // var encrypted_pass = cryptr.encrypt(dec_pass);
        let data = [[name, password]];

        let sql = 'INSERT INTO user (name,password) VALUES  ?'
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
        var name = req.body.name;
        var password = req.body.password;
        // var dec_pass =atob(password);
        // var encrypted_pass = cryptr.decrypt(dec_pass);
        let sql = 'SELECT * FROM users WHERE  name=? AND password=?'
        db.query(sql, [[name], [password]], (err, response) => {
            if (response == "") {
                res.json({
                    success: false,
                    message: 'Incorrect email/password!',
                    code: 200,
                    data: [],
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
                jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {
                    if (err) {
                        console.log('Error occurred while generating token');
                        console.log(err);
                        return false;
                    }
                    else {
                        if (token != false) {
                            // res.send(token);
                            localStorage.setItem('Token', token);
                            res.header();
                            res.json({
                                success: true,
                                message: 'signIn success!',
                                code: 200,
                                data: response,
                                token: token,
                            })
                            res.end();
                        }
                        else {
                            res.send("Could not create token");
                            res.end();
                        }

                    }
                });
            }
        })
    },


}