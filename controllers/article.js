const { Pool } = require('pg');
const getUserId = require('./getUserId');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

const pool = new Pool();

// console.log('userid', userid.getUserId(request));

exports.createArticle = (request, response) => {
  const { title, body } = request.body;
  // const { userid } = request.headers;
  const userid = getUserId.getUserId(request);
  const datetime = new Date();
  const text = 'INSERT INTO articles (title, article, createdOn, userid) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [title, body, datetime, userid];

  // Insert new article

  pool.query(text, values, (error, res) => {
    if (error) {
      res.status(500).send('server not found');
      throw error;
    }
    return response.status(201).json({
      status: 'success',
      data: {
        message: 'Article successfully posted',
    		articleId: res.rows[0].articleid,
    		createdOn: res.rows[0].createdOn,
    		title: res.rows[0].title,
        article: res.rows[0].article,
      },
    });
  });
};


exports.updateArticle = (request, response) => {
  const articleid = parseInt(request.params.articleId, [10]);
  const { title, body } = request.body;
  const newdate = new Date();
  const text = 'UPDATE articles SET title = $1, article = $2, createdOn = $3 WHERE articleid = $4 RETURNING *';

  pool.query(text, [title, body, newdate, articleid],
    (error, res) => {
      if (error) {
        throw error;
      }
      const responseObject = res.rows[0];

      return response.status(201).json({
        status: 'success',
        data: {
          message: 'Article successfully updated.',
          title: responseObject.title,
          article: responseObject.article,
        },
      });
    });
};


exports.deleteArticle = (request, response) => {
  const articleid = parseInt(request.params.articleId, [10]);


  pool.query('DELETE FROM articles WHERE articleid = $1', [articleid],
    (error) => {
      if (error) {
        throw error;
      }
      return response.status(200).json({
        status: 'success',
        data: {
          message: 'Article successfully deleted.',
        },
      });
    });
};


exports.postArticleComment = (request, response) => {
  const articleid = parseInt(request.params.articleId, [10]);
  const { comment } = request.body;
  const authorid = getUserId.getUserId(request);

  const datetime = new Date();
  const text = 'INSERT INTO comments (articleid, comment, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING id';
  const select = 'SELECT a.title, a.article, c.createdon, c.comment FROM articles a INNER JOIN comments c ON a.articleid = c.articleId WHERE a.articleid = $1 AND c.id = $2';
  const values = [articleid, comment, datetime, authorid];

  // Insert comment
  pool.query(text, values, async (err, result) => {
    if (err) {
      response.status(500).send('server not found');
      // throw err;
    }
    const { id } = result.rows[0];
    return pool.query(select, [articleid, id], (error, res) => {
      if (error) {
        response.status(500).send('server not found');
        // throw error;
      }
      response.status(201).json({
        status: 'success',
        data: {
          message: 'Comment successfully created',
          createdOn: res.rows[0].createdon,
          articleTitle: res.rows[0].title,
          article: res.rows[0].article,
          comment: res.rows[0].comment,
        },
      });
    });
  });
};


exports.getArticleAndComments = (request, response) => {
  const articleid = parseInt(request.params.articleId, [10]);
  const text = 'SELECT a.articleid, a.createdon, a.title, a.article, c.id, c.comment, c.authorid, c.articleid FROM articles a INNER JOIN comments c ON a.articleid = c.articleid WHERE a.articleid = $1';
  pool.query(text, [articleid], (error, res) => {
    if (error) {
      // throw error
      return response.status(400).send('Article not found!');
    }
    return response.status(200).json({
      status: 'success',
      data: {
        articleid: res.rows[0].articleid,
        createdon: res.rows[0].createdon,
        title: res.rows[0].title,
        article: res.rows[0].article,
        comments: res.rows.map((row) => ({
          articleid: row.articleid,
          commentId: row.id,
          comment: row.comment,
          authorId: row.authorid,
        })),
      },
    });
  });
};
