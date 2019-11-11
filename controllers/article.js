const { Pool } = require('pg');

const pool = new Pool();



exports.createArticle = (request, response) => {
  console.log('req headers', request.headers);
  const { title, body } = request.body;
  const { userid } = request.headers;

  const datetime = new Date();
  const text = 'INSERT INTO articles (title, body, createdOn, userid) VALUES ($1, $2, $3, $4) RETURNING *';
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
          message : 'Article successfully posted' ,
		  articleId : res.rows[0].articleid ,
		  createdOn : res.rows[0].createdOn ,
		  title : res.rows[0].title ,
        },
      });
    });  
};


exports.updateArticle = (request, response) => {
  const articleid = parseInt(request.params.articleId);
  const { title, body } = request.body

  const newdate = new Date();

  pool.query('UPDATE articles SET title = $1, body = $2, createdOn = $3 WHERE articleid = $4 RETURNING *',
 	[title, body, newdate, articleid],
    (error, res) => {
      if (error) {
        throw error
      }
      return response.status(201).json({
        status: 'success',
        data: {
          message : 'Article successfully updated.' ,
		  title : res.rows[0].title ,
		  body : res.rows[0].body
        },
      });
    })
}


exports.deleteArticle = (request, response) => {
  const articleid = parseInt(request.params.articleId);


  pool.query('DELETE FROM articles WHERE articleid = $1', [articleid],
    (error, res) => {
      if (error) {
        throw error
      }
      return response.status(200).json({
        status: 'success',
        data: {
          message : 'Article successfully deleted.'
        }
      });
    })
}



exports.articleComment = (request, response) => {
  const articleid = parseInt(request.params.articleId);
  const { comment } = request.body;

  const datetime = new Date();
  const text = 'INSERT INTO comments (articleid, comment, createdOn) VALUES ($1, $2, $3) RETURNING *';
  const values = [articleid, comment, datetime];

    // Insert comment
    pool.query(text, values, (error, res) => {
      if (error) {
        res.status(500).send('server not found');
        throw error;
      }
      return response.status(201).json({
        status: 'success',
        data: {
		  message : 'Comment successfully created' ,
		  createdOn : res.rows[0].createdOn ,
		  articleTitle : 'String' ,
		  article : 'String' ,
		  comment : res.rows[0].comment ,
        },
      });
    });  
};
