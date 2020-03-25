//quản lý các link API

'use strict';
module.exports = function (app) {
    let UsersCtrl = require('../Controllers/UsersController');

    // todoList Routes
    app.route('/user').post(UsersCtrl.post);
    app.route('/user/add').post(UsersCtrl.insert);
    app.route('/user/detail').post(UsersCtrl.detail);
    app.route('/user/update').post(UsersCtrl.update)
    app.route('/user/delete').post(UsersCtrl.delete)

    let AuthCtrl = require('../Controllers/AuthController');
    app.route('/signIn').post(AuthCtrl.signIn);
    app.route('/signUp').post(AuthCtrl.signUp);

};