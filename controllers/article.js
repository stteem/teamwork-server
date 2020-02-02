const { Pool } = require('pg');
const getUserId = require('./getUserId');

/* const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
}); */

const pool = new Pool();

// console.log('userid', userid.getUserId(request));

exports.createArticle = (request, response) => {
  const { newtitle, newtext } = request.body;
  // const { userid } = request.headers;
  const authorid = getUserId.getUserId(request);
  const datetime = new Date();
  const insert = 'INSERT INTO items (imageurl, article, title, userid, createdon) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [null, newtext, newtitle, authorid, datetime];

  const select = 'SELECT firstname, lastname FROM users WHERE userid = $1';

  // Insert new article

  pool.query(insert, values, (error, res) => {
    if (error) {
      res.status(500).send('server not found');
      throw error;
    }

    const {
      itemid, createdon, userid, title, article,
    } = res.rows[0];


    pool.query(select, [userid], (err, result) => {
      if (err) {
        res.status(500).send('server not found');
        throw err;
      }

      const { firstname, lastname } = result.rows[0];

      const resObject = {
        message: 'Article successfully posted',
        itemid,
        userid,
        createdon,
        title,
        article,
        firstname,
        lastname,
      };

      return response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};


exports.updateArticle = (request, response) => {
  // const itemid = parseInt(request.params.articleId, [10]);
  const { newitemid, newtitle, newarticle } = request.body;
  // console.log(request.body)
  const newdate = new Date();
  const text = 'UPDATE items SET title = $1, article = $2, createdon = $3 WHERE itemid = $4 RETURNING *';
  const select = 'SELECT firstname, lastname FROM users WHERE userid = $1';

  pool.query(text, [newtitle, newarticle, newdate, newitemid], (error, res) => {
    if (error) {
      throw error;
    }

    const {
      itemid, createdon, userid, title, article,
    } = res.rows[0];


    pool.query(select, [userid], (err, result) => {
      if (err) {
        res.status(500).send('server not found');
        throw err;
      }

      const { firstname, lastname } = result.rows[0];

      const resObject = {
        message: 'Article successfully posted',
        itemid,
        userid,
        createdon,
        title,
        article,
        firstname,
        lastname,
      };

      return response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};


exports.deleteArticle = (request, response) => {
  const itemid = parseInt(request.params.articleId, [10]);


  pool.query('DELETE FROM items WHERE itemid = $1', [itemid],
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
  // const articleid = parseInt(request.params.articleId, [10]);
  const { newarticleid, newcomment } = request.body;
  const authorId = getUserId.getUserId(request);

  const datetime = new Date();
  const text = 'INSERT INTO comments (articleid, comment, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING *';
  const select = 'SELECT firstname, lastname FROM users WHERE userid = $1';
  const values = [newarticleid, newcomment, datetime, authorId];

  // Insert comment
  pool.query(text, values, async (err, result) => {
    if (err) {
      response.status(500).send('server not found');
      // throw err;
    }

    const {
      articleid, createdon, comment, authorid,
    } = result.rows[0];


    return pool.query(select, [authorid], (error, res) => {
      if (error) {
        response.status(500).send('server not found');
        // throw error;
      }

      const { firstname, lastname } = res.rows[0];

      const resObject = {
        message: 'Comment posted',
        articleid,
        firstname,
        lastname,
        createdon,
        comment,
      };

      response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};


exports.getArticleAndComments = (request, response) => {
  const articleId = parseInt(request.params.articleId, [10]);
  const selectArticle = `SELECT i.itemid, i.createdon, i.title, i.article, i.userid, u.firstname, u.lastname FROM items i
                JOIN users u ON i.userid = u.userid WHERE itemid = $1`;

  const selectComment = `SELECT c.id, c.comment, c.authorid, c.articleid, c.createdon, u.firstname, u.lastname FROM comments c
                  JOIN users u ON c.authorid = u.userid WHERE articleid = $1`;

  pool.query(selectArticle, [articleId], (error, res) => {
    if (error) {
      // throw error
      return response.status(400).send('Article not found!');
    }

    const {
      itemid, createdon, title, article, firstname, lastname,
    } = res.rows[0];

    pool.query(selectComment, [articleId], (err, result) => {
      if (err) {
        // throw error
        return response.status(400).send('Comment not found!');
      }

      const comments = result.rows;

      const resObject = {
        articleid: itemid,
        createdon,
        title,
        article,
        firstname,
        lastname,
        comments,
      };

      return response.status(200).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};
