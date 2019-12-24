const mongoose = require('mongoose');
const Order = require('../Models/Order');

//get all orders
exports.index = (req, res) => {
    Order.find()
        .select('_id product_id quantity')
        .populate('product_id')
        .then(result => {
            const orders = {
                'total orders': result.length,
                'orders': result.map(datum => {
                    return {
                        order_id: datum.id,
                        product_id: datum.product_id,
                        quantity: datum.quantity
                    }

                })
            }
            res.status(200).json(orders)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
}

//store new order route
exports.store = (req, res) => {
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        product_id : req.body.product_id,
        quantity : req.body.quantity
    })
    order.save()
        .then(result => {
            console.log(result);
            res.status(201).json('Order created successfully')
        })
        .catch(err => res.status(500).json(err))
}