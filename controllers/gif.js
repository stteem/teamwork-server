const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const getUserId = require('./getUserId');
const dotenv = require('dotenv');
const { dataUri } = require('../middleware/multer-config');

dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log('cloud', cloudinary.config())

const pool = new Pool();

/*const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});*/

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

exports.createGif = async (req, res) => {

  if(!MIME_TYPES.hasOwnProperty(req.file.mimetype)) {
    return res.status(401).send('Only gif files are supported!');
  }
  // const { filename} = req.file;
  console.log('req.file', req.file)
  const userid = await getUserId.getUserId(req);
  let imageurl = '';
  const { title } = req.body;
  // const url = req.protocol + '://' + req.get('host') + '/' + req.file.originalname; Cloudinary can't upload from localhost
  // File upload (example for promise api)
  const file = dataUri(req).content;
  //console.log('upload req', file)
  cloudinary.uploader.upload(file, { tags: 'gifs' })
    .then((image) => {
      imageurl = image.url;
      console.log('imageurl', imageurl)
    })
    .then((req) => {
      
        // Now Insert into database
        const datetime = new Date().toISOString();
        const text = 'INSERT INTO items (imageurl, article, title, userid, createdon) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [imageurl, null, title, userid, datetime];
        const selectNames = 'SELECT firstname, lastname FROM users WHERE userid = $1';

        pool.query(text, values, (error, response) => {
          if (error) {
            res.status(500).send('server not found');
            throw error;
          }
          //console.log('res', response.rows[0])
          const { itemid, imageurl, article, title, userid, createdon } = response.rows[0];

          pool.query(selectNames, [userid], (err, result) => {
            if (error) {
              res.status(500).send('server not found');
              throw error;
            }

            const {firstname, lastname } = result.rows[0];

            res.status(201).json({
              itemid,
              imageurl,
              article,
              title,
              userid,
              createdon,
              firstname,
              lastname
            });
          });
        });
    })
    .catch((err) => {
      if (err) {
        res.status(500).json('No network, please check your internet and try again!');
      }
    });
};


exports.deleteGif = (request, response) => {
  const gifid = parseInt(request.params.gifId, [10]);
  pool.query('DELETE FROM items WHERE itemid = $1', [gifid],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(200).json({
        status: 'success',
        data: {
          message: 'Gif post successfully deleted.',
        },
      });
    });
};


exports.postGifComment = (request, response) => {

  const authorid = getUserId.getUserId(request);

  //const imageid = parseInt(request.params.gifid, [10]);
  const { imageid, comment } = request.body;
  //console.log('comment', request.body)
  const createdon = new Date();
  const insert = 'INSERT INTO gifcomments (imageid, comment, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [imageid, comment, createdon, authorid];
  // Insert comment
  pool.query(insert, values, async (error, res) => {
    if (error) {
      response.status(500).send('server not found');
      // throw error;
    }
    const { imageid, createdon, comment, authorid } = res.rows[0];
    
    //const select = 'SELECT i.title FROM items i INNER JOIN gifcomments g ON i.itemid = g.imageid WHERE i.itemid = $1 AND g.id = $2';

      const select = 'SELECT firstname, lastname FROM users WHERE userid = $1';

    pool.query(select, [authorid], (err, result) => {
      if (err) {
        response.status(500).send('server not found for query 2');
        // throw error;
      }
      const {firstname, lastname} = result.rows[0];

      const resObject = {
        imageid: imageid,
        firstname: firstname,
        lastname: lastname,
        createdon: createdon,
        comment: comment,
      };

      //console.log('res object', resObject)

      return response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};


exports.getGifAndComments = (request, response) => {
  const gifid = parseInt(request.params.gifid, [10]);
  const text = `SELECT i.itemid, i.createdon, i.title, i.imageurl, i.userid, u.firstname, u.lastname FROM items i
                  JOIN users u ON i.userid = u.userid WHERE itemid = $1`;
  const select = `SELECT g.id, g.authorid, g.comment, g.createdon, u.firstname, u.lastname FROM gifcomments g 
                  JOIN users u ON g.authorid = u.userid WHERE imageid = $1`;
  pool.query(text, [gifid], (error, res) => {
    if (error) {
      // throw error
      response.status(400).json({
        status: 'error',
        error: error.stack,
      });
    }
    const { itemid, createdon, title, imageurl, userid, firstname, lastname } = res.rows[0];

    return pool.query(select, [gifid], (err, result) => {
      if (err) {
        response.status(500).send('server not found for query 2');
        // throw error;
      }
      const comments = result.rows;

      const resObject = {
        itemid,
        createdon: createdon,
        firstname: firstname,
        lastname: lastname,
        gifTitle: title,
        url: imageurl,
        comments,
      };

      response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};
