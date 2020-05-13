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
        // if (Author(req)) {
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
        // } else {
        //     resultFaled(res)
        // }

    },
    categoryLevel: (req, res) => {
        // if (Author(req)) {
        let sql = '';
        let params = '';
        if (req.body.Level3 !== undefined) {
            console.log('1')
            sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.id=? ';
            params = req.body.Level3
        } else if (req.body.Level2 !== undefined) {
            sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.categoryParent=? ';
            params = req.body.Level2;
            console.log('2')
            db.query(sql, [params], (err, response) => {
                if (Object.keys(response).length <= 0) {
                    console.log('3')
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
        // } else {
        //     resultFaled(res)
        // }
    },
    ProductsflCate: (req, res) => {
        // if (Author(req)) {
        let sql = '';
        let params = '';
        let productID = req.body.productID;
        if (req.body.Level3 !== undefined) {
            sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.id=? and products.id !=? ';
            params = req.body.Level3
            console.log(params)
        } else if (req.body.Level2 !== undefined) {
            sql = 'SELECT * FROM category INNER JOIN products on products.Level3=category.id WHERE  category.categoryParent=? and products.id !=? ';
            params = req.body.Level2, req.body.productID;
            db.query(sql, [params], (err, response) => {
                if (Object.keys(response).length <= 0) {
                    sql = 'SELECT * FROM category INNER JOIN products on products.Level2=category.id WHERE  category.id=? and products.id !=? ';
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
        db.query(sql, [params, productID], (err, response) => {
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
        // } else {
        //     resultFaled(res)
        // }
    },
    update: (req, res) => {
        // if (Author(req)) {
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
        // } else {
        //     resultFaled(res)
        // }
    },
    insert: (req, res) => {
        // if (Author(req)) {
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
        // } else {
        //     resultFaled(res)
        // }
    },
    delete: (req, res) => {
        // if (Author(req)) {
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
        // } else {
        //     resultFaled(res)
        // }
    },
    rating: (req, res) => {
        // if (Author(req)) {
        let data = [[req.body.productID, req.body.userID, req.body.userName, req.body.number, req.body.content]]
        let id = [[req.body.productID]]
        let sql = 'INSERT INTO rating (productID,userID,userName,number,content) VALUES  ?'
        db.query(sql, [data], (err, response) => {
            console.log(err)
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                let sql = 'SELECT SUM(rating.number) / COUNT(rating.productID) as total,products.numberRating FROM  products INNER JOIN rating on products.id=rating.productID WHERE products.id=?'
                db.query(sql, [id], (err, response) => {
                    console.log(err)
                    if (err !== null) {
                        res.json({
                            err
                        })
                    } else {
                        let data = [[response[0].total]]
                        let number = [[response[0].numberRating + 1]]
                        let sql = 'UPDATE products SET rate=?,numberRating=? WHERE products.id=?'
                        db.query(sql, [data, number, id], (err, response) => {
                            console.log(err)
                            if (err !== null) {
                                res.json({
                                    err
                                })
                            } else {
                                let sql = 'UPDATE orderdetail SET is_rate=1 ,numberRating=? WHERE productID=?'
                                db.query(sql, [req.body.number, id], (err, response) => {
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
            }
        })
        // } else {
        //     resultFaled(res)
        // }
    },
    TotalRate: (req, res) => {
        // if (Author(req)) {
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
        // } else {
        //     resultFaled(res)
        // }
    },
    ratingCMT: (req, res) => {
        // if (Author(req)) {
        let data = [[req.body.productID]]
        let sql = 'SELECT * FROM rating WHERE productID=?'
        db.query(sql, [data], (err, response) => {
            console.log(err)
            let sql = 'SELECT COUNT(IF(number = "5", 1, NULL)) "five",COUNT(IF(number = "4", 1, NULL)) "four",COUNT(IF(number = "3", 1, NULL)) "three",COUNT(IF(number = "2", 1, NULL)) "two",COUNT(IF(number = "1", 1, NULL)) "one",';
            sql += ' SUM(CASE WHEN number = "5" THEN number END) / COUNT(IF(number = "5", 1, NULL)) "total5",'
            sql += ' SUM(CASE WHEN number = "4" THEN number END) / COUNT(IF(number = "4", 1, NULL)) "total4",'
            sql += ' SUM(CASE WHEN number = "3" THEN number END) / COUNT(IF(number = "3", 1, NULL)) "total3",'
            sql += ' SUM(CASE WHEN number = "2" THEN number END) / COUNT(IF(number = "2", 1, NULL)) "total2",'
            sql += ' SUM(CASE WHEN number = "1" THEN number END) / COUNT(IF(number = "1", 1, NULL)) "total1"'
            sql += ' FROM rating WHERE productID=?'
            db.query(sql, [data], (err, response2) => {
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
                        data: {
                            rates: response,
                            count: response2[0]
                        }
                    })
                }
            })
        })
        // } else {
        //     resultFaled(res)
        // }
    },

    getSeen: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM seen_products WHERE userID=? order by id desc '
        db.query(sql, [req.body.userID], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'insert success!',
                    code: 200,
                    data: {
                        data: response
                    }
                })
            }
        })
        // } else {
        //     resultFaled(res)
        // }
    },
    seenProducts: (req, res) => {
        // if (Author(req)) {
        let sql = 'DELETE FROM seen_products WHERE productID=?'
        db.query(sql, [req.body.productID], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                let data = [[req.body.userID, req.body.productID, req.body.productName, req.body.image, req.body.price, req.body.discount]]
                let sql = 'INSERT INTO seen_products (userID,productID,productName,image,price,discount) VALUES  ?'
                db.query(sql, [data], (err, response) => {
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
            }
        })

        // } else {
        //     resultFaled(res)
        // }
    },
    getProductDetail: (req, res) => {
        // if (Author(req)) {
        let sql = 'SELECT * FROM products WHERE id=?'
        db.query(sql, [req.body.id], (err, response) => {
            if (err !== null) {
                res.json({
                    err
                })
            } else {
                res.json({
                    success: true,
                    message: 'deleted success!',
                    code: 200,
                    data: {
                        product: response[0]
                    }
                })
            }
        })
        // } else {
        //     resultFaled(res)
        // }
    },
    getRateProducts: (req, res) => {
        // if (Author(req)) {
        let sql = 'select orderdetail.*,rating.content from orderdetail INNER JOIN new_order on orderdetail.orderID=new_order.id INNER JOIN users on users.id=new_order.userID '
        sql += 'INNER JOIN rating on rating.productID=orderdetail.productID WHERE new_order.status=1 AND new_order.userID=? AND orderdetail.is_rate=? group by rating.content'
        db.query(sql, [req.body.userID, req.body.is_rate], (err, response) => {
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
                        products: response,
                        total: Object.keys(response).length
                    }
                })
            }
        })

        // } else {
        //     resultFaled(res)
        // }
    },

}