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
    addressUser: (req, res) => {
        let sql = 'SELECT * FROM addressuser WHERE userID=?'
        db.query(sql, [[req.body.userID]], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'success!',
                    code: 200,
                    data: {
                        address: response
                    }
                })
            }
        })
    },
    newAddress: (req, res) => {
        let data = [[req.body.userID, req.body.name, req.body.phone, req.body.address, req.body.province, req.body.district, req.body.ward, req.body.isDefauld, req.body.created_at]]
        let sql = 'INSERT INTO addressuser (userID,name,phone,address,province,district,ward,isDefauld,created_at) VALUES ?'
        db.query(sql, [data], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                let sql = 'SELECT * FROM addressuser WHERE userID=? Order By id desc limit 1'
                db.query(sql, [[req.body.userID]], (err, response) => {
                    if (err !== null) {
                        res.json({
                            err
                        })
                    } else {
                        res.json({
                            success: true,
                            message: 'success!',
                            code: 200,
                            data: response
                        })
                    }
                })

            }
        })
    },
    addNewOrder: (req, res) => {
        let data = [[req.body.userID, req.body.addressID, req.body.price_temp, req.body.total, req.body.deliveryID, req.body.status, req.body.title]]
        let sql = 'INSERT INTO new_order (userID,addressID,price_temp,total,deliveryID,status,title) VALUES ?'
        db.query(sql, [data], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                let sql = 'SELECT * FROM new_order WHERE userID=? Order By id desc limit 1'
                db.query(sql, [[req.body.userID]], (err, response) => {
                    if (err !== null) {
                        res.json({
                            err
                        })
                    } else {
                        res.json({
                            success: true,
                            message: 'success!',
                            code: 200,
                            data: response
                        })
                    }
                })
            }
        })
    },
    addNewOrderDetail: (req, res) => {
        let data = [[req.body.orderID, req.body.productID, req.body.productName, req.body.image, req.body.quantity, req.body.price, req.body.discount,0]]
        let sql = 'INSERT INTO orderdetail (orderID,productID,productName,image,quantity,price,discount,is_rate) VALUES ?'
        db.query(sql, [data], (err, response) => {
            console.log(err)
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                let quantity = [[req.body.quantity_product - req.body.quantity]]
                let sql = 'UPDATE products SET quantity=?  WHERE id = ?'
                db.query(sql, [quantity, [[req.body.productID]]], (err, response) => {
                    if (err !== null) {
                        res.json({
                            err
                        })
                    } else {
                        res.json({
                            success: true,
                            message: 'success!',
                            code: 200,
                        })
                    }
                })
            }
        })
    },
}