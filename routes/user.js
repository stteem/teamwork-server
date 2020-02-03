const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//const cors = require('./cors');



const userCtrl = require('../controllers/user');

router.post('/auth/create-user', auth, userCtrl.createUser);
router.post('/auth/signin', userCtrl.login);

module.exports = router;