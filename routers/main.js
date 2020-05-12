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
    app.route('/products/delete').post(ProductsCtrl.delete);
    app.route('/products/insert').post(ProductsCtrl.insert);
    app.route('/products/rating').post(ProductsCtrl.rating);
    app.route('/products/totalRate').post(ProductsCtrl.TotalRate);
    app.route('/products/ratingCMT').post(ProductsCtrl.ratingCMT);
    app.route('/products/productsflcate').post(ProductsCtrl.ProductsflCate);
    app.route('/products/getSeen').post(ProductsCtrl.getSeen);
    app.route('/products/seenProducts').post(ProductsCtrl.seenProducts);
    app.route('/products/getProductDetail').post(ProductsCtrl.getProductDetail);

    let CategorysCtrl = require('../Controllers/CategoryController');
    app.route('/category').post(CategorysCtrl.LV0);
    app.route('/categoryAll').post(CategorysCtrl.All);
    app.route('/category/update').post(CategorysCtrl.update);
    app.route('/category/delete').post(CategorysCtrl.delete);
    app.route('/category/insert').post(CategorysCtrl.insert);


    let HomePage = require('../Controllers/HomePageController');
    app.route('/slider').post(HomePage.slider);
    app.route('/listOrder').post(HomePage.listOrder);
    app.route('/getItemAddressUser').post(HomePage.getItemAddressUser);
    app.route('/getProductsOrder').post(HomePage.getProductsOrder);
    app.route('/getPurchased').post(HomePage.getPurchased);
    app.route('/orderStatus').post(HomePage.orderStatus);

    let PayPage = require('../Controllers/PayController');
    app.route('/addressUser').post(PayPage.addressUser);
    app.route('/newAddress').post(PayPage.newAddress);
    app.route('/addNewOrder').post(PayPage.addNewOrder);
    app.route('/addNewOrderDetail').post(PayPage.addNewOrderDetail);

};