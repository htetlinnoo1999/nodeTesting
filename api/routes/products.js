const express = require('express');
const router = express.Router();

const imgUploadHelper = require('../Helpers/ImageUploadHelper');
const ProductController = require('../Controllers/ProductController');
const checkAuth = require('../Middleware/check-auth');

//ROUTES
//get all products route
router.get('/', ProductController.index)

//product save route
router.post('/',checkAuth, imgUploadHelper.single('productImg'), ProductController.store)

//product update route
router.patch('/:product_id', checkAuth, ProductController.update)

//product delete route
router.delete('/:product_id', checkAuth, ProductController.delete)


module.exports = router;