const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const checkToken = require('../middileware/jwt.token');

router.get('/', (req, res) => res.send("HOME"));

router.get('/get-users', checkToken, userController.getUser);

router.post('/user-create', userController.userCreate);

router.put('/verify-user', userController.userVerify);

router.post('/login', userController.login);

module.exports = router;