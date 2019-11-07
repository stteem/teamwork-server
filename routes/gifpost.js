const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//const multer = require('multer');

const gifCtrl = require('../controllers/gifpost');

//var upload = multer({ dest: 'images/' })
//upload.single('image')



//router.get('/users', userCtrl.getUsers);
//router.post('/auth/create-user', userCtrl.createUser);
//router.post('/auth/login', userCtrl.login);

router.post('/gifs', multer, gifCtrl.createGif);


module.exports = router;

