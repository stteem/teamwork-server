const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user');

router.get('/users', userCtrl.getUsers);
router.post('/auth/create-user', userCtrl.createUser);
router.post('/auth/login', userCtrl.login);

module.exports = router;