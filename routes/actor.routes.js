const express = require('express');
const actor = require('../controllers/actor');
const image = require('../controllers/image');
const social = require('../controllers/social');
const langs = require('../controllers/langs');
const video = require('../controllers/video');


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

// LANG

router.get('/lang/get/:id_a', langs.getLangs);
router.post('/lang/insert', langs.insertLang);
router.put('/lang/update/', langs.updateLang);
router.delete('/lang/delete/:id_l', langs.deleteLang);

// VIDEO

router.get('/vid/get/:id_a', video.get);
router.get('/vid/get/one/:id_a', video.getOne);
router.delete('/vid/delete/:id_v', video.delete);
router.post('/vid/insert', video.save);


// RRSS

router.post('/sm/insert/', social.create);
router.get('/sm/get/:id_a', social.load);
router.put('/sm/update/', social.update);


//TODO: GET FROM ACTOR, UPDATE, DELETE

//VIDEO


module.exports = router;