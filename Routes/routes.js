const express = require('express');
const countryController = require('../Controllers/userController');

const router = express.Router();

router.get('/', (req, res) => res.send("HOME"));

router.get('/get-user', countryController.getUser);

router.post('/user-create', countryController.userCreate);

router.put('/verify-user', countryController.VerifyUser);

router.post('/login', countryController.login);

module.exports = router;