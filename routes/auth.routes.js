import express from "express";
import authentication from '../controllers/auth';
import mailer from '../controllers/mailer'

const router = express.Router();

//login
router.post('/logIn', authentication.logIn);

//form
router.post('/sendForm', mailer.send);

module.exports = router;