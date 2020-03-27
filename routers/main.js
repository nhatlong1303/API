//quản lý các link API

'use strict';

module.exports = function (app) {
    let UsersCtrl = require('../Controllers/UsersController');
    // todoList Routes
    app.route('/users').post(UsersCtrl.post);
    app.route('/users/add').post(UsersCtrl.insert);
    app.route('/users/detail').post(UsersCtrl.detail);
    app.route('/users/update').post(UsersCtrl.update)
    app.route('/users/delete').post(UsersCtrl.delete)

    let AuthCtrl = require('../Controllers/AuthController');
    app.route('/signIn').post(AuthCtrl.signIn);
    app.route('/signUp').post(AuthCtrl.signUp);

    let ProductsCtrl = require('../Controllers/ProductsController');
    app.route('/products').post(ProductsCtrl.all);
    app.route('/products/category').post(ProductsCtrl.categoryLevel);
    app.route('/products/update').post(ProductsCtrl.update);

    let CategorysCtrl = require('../Controllers/CategoryController');
    app.route('/category').post(CategorysCtrl.LV0);
    app.route('/categoryAll').post(CategorysCtrl.All);
};