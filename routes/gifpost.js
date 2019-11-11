const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const multer = require('multer');

const gifCtrl = require('../controllers/gifpost');

//var upload = multer({ dest: 'images/' })
//upload.single('image')


router.post('/gifs', auth, multer, gifCtrl.createGif);
router.delete('/gifs/:gifId', auth, gifCtrl.deleteGif);


module.exports = router;

