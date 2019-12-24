const express = require('express');
const router = express.Router();

const imgUploadHelper = require('../Helpers/ImageUploadHelper');
const ProductController = require('../Controllers/ProductController');

//ROUTES
//get all products route
router.get('/', ProductController.index)

//product save route
router.post('/',imgUploadHelper.single('productImg'), ProductController.store)

//product update route
router.patch('/:product_id', ProductController.update)

//product delete route
router.delete('/:product_id', ProductController.delete)


module.exports = router;