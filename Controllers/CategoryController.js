'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
//response
var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./scratch');
function Author(req) {
    return (
        'Bearer ' + localStorage.getItem('Token') == req.headers.authorization  ? true : false
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
    LV0: (req, res) => {
        // if (Author(req)) {
            let sql = 'SELECT * FROM category WHERE ?'
            db.query(sql, [req.body], (err, response) => {
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
                            category: response
                        }
                    })
                }

            })
        // } else {
        //     resultFaled(res)
        // }
    },
    All: (req, res) => {
        // if (Author(req)) {
            let sql = 'SELECT * FROM category '
            db.query(sql, null, (err, response) => {
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
                            category: response
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
            let sql = 'UPDATE category SET categoryName=?, nameDev=?,updated_at=?, categoryParent=? WHERE id = ?'
            db.query(sql, [req.body.categoryName, req.body.nameDev, req.body.updated_at, req.body.categoryParent, id], (err, response) => {
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
            let data = [[req.body.categoryName, req.body.nameDev, req.body.created_at, req.body.categoryParent]]
            let sql = 'INSERT INTO category (categoryName,nameDev,created_at,categoryParent) VALUES  ?'
            db.query(sql, [data], (err, response) => {
                console.log(response)
                if (response == '' || response == undefined) {
                    res.json({
                        success: false,
                        message: 'insert failed!',
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
            let sql = 'DELETE FROM category WHERE id=?'
            db.query(sql, [req.body.id], (err, response) => {
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
        // } else {
        //     resultFaled(res)
        // }
    }
}