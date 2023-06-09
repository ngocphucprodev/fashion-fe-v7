const Orders = require("../models/modelOrders")
const OrderDetail = require("../models/modelOrderDetail")
//const { MongooseToObject } = require('../../../util/mongoose')
const OrdersController = {
    show(req, res) {
        Orders.find({})
            .then(orders => {
                // products = products.map(product => product.toObject())
                // res.render('products', { products })
                res.json(orders)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },
    index(req, res, next) {
        Orders.findById(req.params.id).populate("gallery")
            .then(products => {
                // res.render('detail', { products: MongooseToObject(products) })
                res.json(products)
            })
            .catch(err => res.status(400).json('Error: ' + err));
    },

    store(req, res, next) {
        console.log(req.body)
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        const order = new Orders(req.body)
        order.save(req.body)
            .then((data) =>
                // res.redirect('/show')
                res.json(data)
                // console.log("success")
            )
            .catch(err => res.status(400).json('Error: ' + err));
        // res.json(req.body)
    },

    edit(req, res) {
        // console.log(req.params.id)
        Orders.findById(req.params.id).updateOne({ $set: req.body })
            // Brands.findByIdAndUpdate(req.params.id, { $set: req.body })
            .then(() => {
                // Brands.updateOne({ $set: req.body })
                res.json({ status: "success" })
            }
                // res.render('update', { products: MongooseToObject(products) })
            )
            .catch(err => res.status(400).json('Error: ' + err));

    },

    // update(req, res, next) {
    //     Products.updateOne({ $set: req.body })
    //         .then(() => res.redirect('/show'))
    //         .catch(err => res.status(400).json('Error: ' + err));

    // },

    delete(req, res, next) {
        Orders.findByIdAndDelete(req.params.id)
            .then(() => res.redirect('/show'))
            .catch(err => res.status(400).json('Error: ' + err));
    },

}
module.exports = OrdersController