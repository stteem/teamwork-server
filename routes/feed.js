const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
//const cors = require('cors');
const feedCtrl = require('../controllers/feed');

//var app = express();

//router.use(cors());
//router.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
router.get('/feed', /*auth,*/ feedCtrl.getFeed);

module.exports = router;