const express = require('express');
const router = express.Router();

const UserController = require('../Controllers/UserController')

router.post('/signUp', UserController.signUp)

router.post('/login', UserController.login)

router.delete('/:user_id', UserController.delUser)

module.exports = router;