'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
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
    slider: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM slides'
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
                        slides: response
                    }
                })
            }

        })
        // } else {
        //     resultFaled(res)
        // }

    },
    listOrder: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM new_order WHERE userID=?'
        db.query(sql, [req.body.userID], (err, response) => {
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
                        orders: response
                    }
                })
            }

        })
        // } else {
        //     resultFaled(res)
        // }

    },
    getItemAddressUser: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM addressuser WHERE id=?'
        db.query(sql, [req.body.addressID], (err, response) => {
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
                        address: response[0]
                    }
                })
            }

        })
        // } else {
        //     resultFaled(res)
        // }

    },
    getProductsOrder: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM orderdetail WHERE orderID=?'
        db.query(sql, [req.body.orderID], (err, response) => {
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
                        products: response
                    }
                })
            }

        })
        // } else {
        //     resultFaled(res)
        // }

    },
    getPurchased: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT orderdetail.*,new_order.created_at as dateBuy from new_order INNER JOIN orderdetail on new_order.id=orderdetail.orderID WHERE new_order.status=? AND new_order.userID=?'
        db.query(sql, [req.body.status,req.body.userID], (err, response) => {
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
                        products: response
                    }
                })
            }
        })
        // } else {
        //     resultFaled(res)
        // }

    },
    orderStatus: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM new_order WHERE status=? AND userID=?'
        db.query(sql, [req.body.status,req.body.userID], (err, response) => {
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
                        orders: response
                    }
                })
            }
        })
        // } else {
        //     resultFaled(res)
        // }

    },
}