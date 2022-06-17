import express from "express";
import actor from "../controllers/actor";
import image from "../controllers/image";
import social from "../controllers/social";

const router = express.Router();

// ACTORS

router.post('/create', actor.create);
router.get('/get', actor.readAll);
router.get('/get/:id_a', actor.read);
router.put('/update/:id_a', actor.update);
router.delete('/delete/:id_a', actor.delete);

// IMAGES

router.post('/img/create/:id_a', image.create);
router.post('/img/new/:id_a', image.newImg);
router.post('/img/chg/main/', image.chgMain);
router.get('/img/get/:id_a', image.readFromActor);
router.delete('/img/delete/:id_img', image.delete);
router.get('/img/getMain/:w_a/:h_a/:id_a', image.mainImg);
router.get('/img/getRemain/:w_a/:h_a/:id_a', image.remainingImgs);


router.post('/sm/create/:id_a', social.create);
//TODO: GET FROM ACTOR, UPDATE, DELETE

//VIDEO


module.exports = router;