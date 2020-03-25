'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
//response
module.exports = {
    post: (req, res) => {
        let sql = 'SELECT * FROM user'
        db.query(sql, (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'Access success!',
                    code: 200,
                    data: {
                        user: response
                    }
                })
            }

        })
    },
    detail: (req, res) => {
        let params = req.body;
        let sql = 'SELECT * FROM user WHERE ?'
        db.query(sql, [params], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'Access success!',
                    code: 200,
                    data: {
                        user: response[0]
                    }
                })
            }
        })
    },
    update: (req, res) => {
        let user_id = req.body.user_id;
        console.log('update', data)
        let sql = 'UPDATE user SET userName=? , password=? WHERE user_id = ?'
        db.query(sql, [req.body.userName,req.body.password, user_id], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'Update success!',
                    code: 200,
                })
            }
        })
    },
    insert: (req, res) => {
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        let data = [[req.body.userName, hashedPassword]];

        let sql = 'INSERT INTO user (userName,password) VALUES  ?'
        db.query(sql, [data], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'Insert success!',
                    code: 200,
                })
            }
        })
    },
    delete: (req, res) => {
        let sql = 'DELETE FROM user WHERE ?'
        db.query(sql, [req.body], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'Delete success!',
                    code: 200,
                })
            }
        })
    }
}