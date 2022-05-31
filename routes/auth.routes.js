import express from "express";
import authentication from '../controllers/auth';

const router = express.Router();

router.post('/logIn', authentication.logIn);

module.exports = router;