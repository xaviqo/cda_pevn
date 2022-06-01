import express from "express";
import actor from "../controllers/actor";

const router = express.Router();

router.post('/create', actor.create);

router.get('/get', actor.readAll);

router.get('/get/:id_a', actor.read);

router.put('/update/:id_a', actor.update);

router.delete('/delete/:id_a', actor.delete);

module.exports = router;