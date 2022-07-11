const express = require('express');
const authentication = require('../controllers/auth');
const mailer = require('../controllers/mailer');
const router = express.Router();

//login
router.post('/logIn', authentication.logIn);

//form
router.post('/sendForm', mailer.send);

module.exports = router;