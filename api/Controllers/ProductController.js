const mongoose = require('mongoose');

const Product = require('../Models/Product');

//get all products
exports.index = (req, res) => {
    Product.find()
        .select('_id name price product_img')
        .exec()
        .then(result => {
            const data = {
                'total products': result.length,
                'products': result.map(datum => {
                    return {
                        _id: datum.id,
                        name: datum.name,
                        price: datum.price,
                        img_path: datum.product_img
                    }
                })
            }
            if (result.length > 0) {
                res.status(200).json(data)
            } else {
                res.status(404).json('No products found')
            }
        })
        .catch(err => res.status(500).json({
            error: err
        }))
}

//store product
exports.store = (req, res) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        product_img: req.file.path
    })
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling post request of /products',
                created_product: product
            })
        })
        .catch(err => res.status(500).json(err));
}

//update product
exports.update = (req, res) => {
    const id = req.params.product_id;
    const updatedata = req.body;
    console.log(updatedata);
    
    Product.updateOne({
            _id: id
        }, {
            $set: updatedata
        }).then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err);
        })
}

//delete product
exports.delete = (req, res) => {
    const id = req.params.product_id;
    Product.findOneAndDelete({
        _id: id
    }).then(() => {
        res.status(200).json('data deleted successfully');
    }).catch(err => {
        res.status(500).json(err);
    })
}