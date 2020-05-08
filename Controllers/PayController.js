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
        let data = [[req.body.userID, req.body.name, req.body.phone, req.body.address, req.body.province, req.body.district, req.body.ward, req.body.isDefauld]]
        let sql = 'INSERT INTO addressuser (userID,name,phone,address,province,district,ward,isDefauld) VALUES ?'
        db.query(sql, [data], (err, response) => {
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
    },
}