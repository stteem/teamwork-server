const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getUsers);
router.post('/', userCtrl.createUser);

module.exports = router;