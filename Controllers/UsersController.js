'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
//response
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
function Author(req) {
    return (
        'Bearer ' + localStorage.getItem('Token') == req.headers.authorization ? true : false
    )
}
function resultFaled(res) {
    return (
        res.json({
            success: false,
            message: 'NO TOKEN PROVIDED!',
            code: 500,
        })
    )
}
module.exports = {
    post: (req, res) => {
        // if (Author(req)) {
            let sql = 'SELECT * FROM users'
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
                            users: response
                        }
                    })
                }

            })
        // } else {
        //     resultFaled(res)
        // }

    },
    detail: (req, res) => {
        // if (Author(req)) {
            let params = req.body;
            let sql = 'SELECT * FROM users WHERE ?'
            db.query(sql, [params], (err, response) => {
                if (err !== null) {
                    res.json({
                        message: err.sqlMessage
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
        // } else {
        //     resultFaled(res)
        // }
    },
    update: (req, res) => {
        // if (Author(req)) {
            let id = req.body.id;
            let sql = 'UPDATE users SET ?  WHERE id = ?'
            db.query(sql, [req.body, id], (err, response) => {
                console.log(response)
                if (response.message == '') {
                    res.json({
                        success: false,
                        message: 'Update failed!',
                        code: 500,
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Update success!',
                        code: 200,
                    })
                }
            })
        // } else {
        //     resultFaled(res)
        // }
    },
    insert: (req, res) => {
        // if (Author(req)) {
            let data = [[req.body.name != null ? req.body.name : '', req.body.email != null ? req.body.email : '', req.body.password]];
            let sql = 'INSERT INTO users (name,email,password) VALUES  ?'
            db.query(sql, [data], (err, response) => {
                if (response == '' || response == undefined) {
                    res.json({
                        success: false,
                        message: err.sqlMessage,
                        code: 500,
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Insert success!',
                        code: 200,
                    })
                }

            })
        // } else {
        //     resultFaled(res)
        // }
    },
    delete: (req, res) => {
        // if (Author(req)) {
            let sql = 'DELETE FROM users WHERE id=?'
            db.query(sql, [req.body.id], (err, response) => {
                if (err !== null) {
                    res.json({
                        message: err.sqlMessage,
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Delete success!',
                        code: 200,
                    })
                }
            })
        // } else {
        //     resultFaled(res)
        // }
    }
}