'use strict'

const util = require('util')
const mysql = require('mysql')
const db = require('../db')
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
}