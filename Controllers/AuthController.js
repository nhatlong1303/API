const db = require('../db')
var jwt = require('jsonwebtoken');
var atob = require('atob');
var Cryptr = require('cryptr'),
    cryptr = new Cryptr('myTotalySecretKey');

var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
module.exports = {
    signUp: (req, res) => {
        console.log(req.body.name)
        let data = [[req.body.name, req.body.password, req.body.phone, req.body.email, req.body.birthday, req.body.sex, req.body.created_at]];
        let sql = 'INSERT INTO users (name,password,phone,email,birthday,sex,created_at) VALUES  ?'
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
                    code: 500,
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
                            // localStorage.setItem('Token', token);
                            localStorage.setItem('Token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUyODI1NTYsImp3dGlkIjoiZXJ5NzVtIiwiYXVkaWVuY2UiOiJURVNUIiwiZGF0YSI6Ilt7XCJpZFwiOjIyLFwibmFtZVwiOlwiYWRtaW5cIixcImVtYWlsXCI6XCJcIixcInBhc3N3b3JkXCI6XCIxMjNcIixcInJlbWVtYmVyX3Rva2VuXCI6bnVsbCxcImNyZWF0ZWRfYXRcIjpudWxsLFwidXBkYXRlZF9hdFwiOm51bGx9XSIsImV4cCI6MTU4NTI4NjE1Nn0.AoQDzIvL-SB7mcEio-SrNjObMRMWZXg4sZJnS-dF0LE');
                            res.header();
                            res.json({
                                success: true,
                                message: 'signIn success!',
                                code: 200,
                                data: {
                                    user: response[0]
                                },
                                // token:token
                                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODUyODI1NTYsImp3dGlkIjoiZXJ5NzVtIiwiYXVkaWVuY2UiOiJURVNUIiwiZGF0YSI6Ilt7XCJpZFwiOjIyLFwibmFtZVwiOlwiYWRtaW5cIixcImVtYWlsXCI6XCJcIixcInBhc3N3b3JkXCI6XCIxMjNcIixcInJlbWVtYmVyX3Rva2VuXCI6bnVsbCxcImNyZWF0ZWRfYXRcIjpudWxsLFwidXBkYXRlZF9hdFwiOm51bGx9XSIsImV4cCI6MTU4NTI4NjE1Nn0.AoQDzIvL-SB7mcEio-SrNjObMRMWZXg4sZJnS-dF0LE',
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