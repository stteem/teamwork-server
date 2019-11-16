const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user');

//router.get('/users', userCtrl.getUsers);
router.post('/auth/create-user', auth, userCtrl.createUser);
router.post('/auth/signin', userCtrl.login);

module.exports = router;