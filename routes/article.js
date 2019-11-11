const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/article');


router.post('/articles', auth, articleCtrl.createArticle);
router.post('/articles/:articleId/comment', auth, articleCtrl.articleComment);

router.patch('/articles/:articleId', auth, articleCtrl.updateArticle);
router.delete('/articles/:articleId', auth, articleCtrl.deleteArticle);


module.exports = router;

