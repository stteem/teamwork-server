const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const articleCtrl = require('../controllers/article');

router.get('/articles/:articleId', auth, articleCtrl.getArticleAndComments);
router.post('/articles', auth, articleCtrl.createArticle);
router.post('/articles/:articleId/comment', auth, articleCtrl.postArticleComment);

router.patch('/articles/:articleId', auth, articleCtrl.updateArticle);
router.delete('/articles/:articleId', auth, articleCtrl.deleteArticle);


module.exports = router;

