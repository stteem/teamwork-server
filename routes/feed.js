const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const feedCtrl = require('../controllers/feed');


router.get('/feed', auth, feedCtrl.getFeed);

module.exports = router;