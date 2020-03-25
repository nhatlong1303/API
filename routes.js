//quản lý các link API

'use strict';
module.exports = function (app) {
    let productsCtrl = require('./Controllers/UsersController');

    // todoList Routes
    app.route('/user')
        .post(productsCtrl.post);

    app.route('/user/add')
        .get(productsCtrl.insert);

    app.route('/user/detail')
        .post(productsCtrl.detail)
        // .put(productsCtrl.update)
        // .delete(productsCtrl.delete);
};