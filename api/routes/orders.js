const express = require('express')
const router = express.Router();

const OrderController = require('../Controllers/OrderController');

//get all orders route
router.get('/', OrderController.index)

//save order route
router.post('/', OrderController.store)

module.exports = router;