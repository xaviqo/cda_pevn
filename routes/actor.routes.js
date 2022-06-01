import express from "express";
import actor from "../controllers/actor";
import experiencie from "../controllers/experiencie";
import formation from "../controllers/formation";
import language from "../controllers/langs";
import image from "../controllers/image";
import social from "../controllers/social";

const router = express.Router();

// ACTORS

router.post('/create', actor.create);
router.get('/get', actor.readAll);
router.get('/get/:id_a', actor.read);
router.put('/update/:id_a', actor.update);
router.delete('/delete/:id_a', actor.delete);

// EXPERIENCIES

router.post('/exp/create/:id_a', experiencie.create);
router.get('/exp/get/:id_a', experiencie.readFromActor);
router.put('/exp/update/:id_exp', experiencie.update);
router.delete('/exp/delete/:id_exp', experiencie.delete);


// FORMATION

router.post('/frm/create/:id_a', formation.create);
router.get('/frm/get/:id_a', formation.readFromActor);
router.put('/frm/update/:id_frm', formation.update);
router.delete('/frm/delete/:id_frm', formation.delete);

// LANGUAGE

router.post('/lng/create/:id_a', language.create);
router.get('/lng/get/:id_a', language.readFromActor);
router.put('/lng/update/:id_lng', language.update);
router.delete('/lng/delete/:id_lng', language.delete);

// IMAGES

router.post('/img/create/:id_a', image.create);
router.get('/img/get/:id_a', image.readFromActor)
//TODO: UPDATE DELETE

// SOCIAL MEDIA

router.post('/sm/create/:id_a', social.create);
//TODO: GET FROM ACTOR, UPDATE, DELETE

//VIDEO


module.exports = router;