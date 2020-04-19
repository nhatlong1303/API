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
    all: (req, res) => {
        if (Author(req)) {
            let sql = 'SELECT * FROM products'
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
                            products: response
                        }
                    })
                }

            })
        } else {
            resultFaled(res)
        }

    },
    categoryLevel: (req, res) => {
        if (Author(req)) {
            let sql = '';
            let params = '';
            if (req.body.Level3 !== undefined) {
                sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.id=? ';
                params = req.body.Level3
            } else if (req.body.Level2 !== undefined) {
                sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.categoryParent=? ';
                params = req.body.Level2;
                console.log('2')
                db.query(sql, [params], (err, response) => {
                    if (Object.keys(response).length <= 0) {
                        console.log('2')
                        sql = 'SELECT * FROM category INNER JOIN products on products.Level2=category.id WHERE  category.id=? ';
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
                                        products: response,
                                        total: Object.keys(response).length
                                    }
                                })
                            }
                        })
                    } else {
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
                                    products: response,
                                    total: Object.keys(response).length
                                }
                            })
                        }
                    }

                })
                return;
            } else {
                sql = 'SELECT * FROM category INNER JOIN products on  products.Level1=category.id or products.Level2=category.id or  products.Level3=category.id WHERE  category.categoryParent=? '
                params = req.body.Level1
            }
            db.query(sql, [params, params], (err, response) => {
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
                            products: response,
                            total: Object.keys(response).length
                        }
                    })
                }
            })
        } else {
            resultFaled(res)
        }
    },
    update: (req, res) => {
        if (Author(req)) {
            let id = req.body.id;
            let sql = 'UPDATE products SET productName=? , description=?,image=?,quantity=?,price=?,updated_at=?,discount=?  WHERE id = ?'
            db.query(sql, [req.body.productName, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.updated_at, req.body.discount, id], (err, response) => {
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
        } else {
            resultFaled(res)
        }
    },
    insert: (req, res) => {
        if (Author(req)) {
            let data = [[req.body.productName, req.body.description, req.body.image, req.body.quantity, req.body.price, req.body.created_at, req.body.Level1, req.body.Level2, req.body.Level3, req.body.discount]]
            let sql = 'INSERT INTO products (productName,description,image,quantity,price,created_at,Level1,Level2,Level3,discount) VALUES  ?'
            db.query(sql, [data], (err, response) => {
                console.log(err)
                if (err !== null) {
                    res.json({
                        err
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'insert success!',
                        code: 200,
                    })
                }
            })
        } else {
            resultFaled(res)
        }
    },
    delete: (req, res) => {
        if (Author(req)) {
            let sql = 'DELETE FROM products WHERE id=?'
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
        } else {
            resultFaled(res)
        }
    },
    rating: (req, res) => {
        if (Author(req)) {
            let data = [[req.body.productID, req.body.userID, req.body.number, req.body.content, req.body.created_at]]
            let id=[[req.body.productID]]
            let sql = 'INSERT INTO rating (productID,userID,number,content,created_at) VALUES  ?'
            db.query(sql, [data], (err, response) => {
                console.log(err)
                if (err !== null) {
                    res.json({
                        err
                    })
                } else {
                    let sql = 'SELECT SUM(rating.number) / COUNT(rating.productID) as total FROM  products INNER JOIN rating on products.id=rating.productID WHERE products.id=?'
                    db.query(sql, [id], (err, response) => {
                        console.log(err)
                        if (err !== null) {
                            res.json({
                                err
                            })
                        } else {
                            let data=[[response[0].total]]
                            let sql = 'UPDATE products SET rate=? WHERE products.id=?'
                            db.query(sql, [data,id], (err, response) => {
                                console.log(err)
                                if (err !== null) {
                                    res.json({
                                        err
                                    })
                                } else {
                                    res.json({
                                        success: true,
                                        message: 'rating success!',
                                        code: 200,
                                    })
                                }
                            })
                        }
                    })
                }
            })
        } else {
            resultFaled(res)
        }
    },
    TotalRate: (req, res) => {
        if (Author(req)) {
            let data = [[req.body.productID]]
            let sql = 'SELECT SUM(rating.number) / COUNT(rating.productID) as total FROM  products INNER JOIN rating on products.id=rating.productID WHERE products.id=?'
            db.query(sql, [data], (err, response) => {
                console.log(err)
                if (err !== null) {
                    res.json({
                        err
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Access success!',
                        code: 200,
                        data: response[0]
                    })
                }
            })
        } else {
            resultFaled(res)
        }
    },
}