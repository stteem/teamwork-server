const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');
const getUserId = require('./getUserId');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log('cloud', cloudinary.config())

//const pool = new Pool();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

exports.createGif = async (req, res) => {
  // const { filename} = req.file;
  const userid = await getUserId.getUserId(req);
  let imageurl = '';
  const { title } = req.body;
  // const url = req.protocol + '://' + req.get('host') + '/' + req.file.originalname; Cloudinary can't upload from localhost
  // const path = 'images/' + req.file.filename;
  // File upload (example for promise api)
  cloudinary.uploader.upload(req.file.path, { tags: 'gifs' })
    .then((image) => {
      imageurl = image.url;
    })
    .then(() => {
      fs.unlink(req.file.path, () => {
        // Now Insert into database
        const datetime = new Date();
        const text = 'INSERT INTO images (userid, imageurl, title, createdon) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [userid, imageurl, title, datetime];

        pool.query(text, values, (error, response) => {
          if (error) {
            res.status(500).send('server not found');
            throw error;
          }
          res.status(201).json({
            status: 'success',
            data: {
              message: 'GIF image successfully posted',
              gifId: response.rows[0].imageid,
              createdOn: response.rows[0].createdon,
              title: response.rows[0].title,
              imageUrl: response.rows[0].imageurl,
              userId: response.rows[0].userid,
            },
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
  pool.query('DELETE FROM images WHERE imageid = $1', [gifid],
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
  // let resObject = {};
  const authorid = getUserId.getUserId(request);

  const imageid = parseInt(request.params.gifid, [10]);
  const { comment } = request.body;
  const createdon = new Date();
  const insert = 'INSERT INTO gifcomments (imageid, comment, createdon, authorid) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [imageid, comment, createdon, authorid];
  // Insert comment
  pool.query(insert, values, async (error, res) => {
    if (error) {
      response.status(500).send('server not found');
      // throw error;
    }
    const { id } = res.rows[0];
    const imageId = res.rows[0].imageid;
    const createdOn = res.rows[0].createdon;
    const newComment = res.rows[0].comment;

    // console.log('res object 1', resObject)
    const select = 'SELECT i.title FROM images i INNER JOIN gifcomments g ON i.imageid = g.imageid WHERE i.imageid = $1 AND g.id = $2';

    pool.query(select, [imageid, id], (err, result) => {
      if (err) {
        response.status(500).send('server not found for query 2');
        // throw error;
      }
      const newtitle = result.rows[0].title;
      // console.log('res object 2', resObject)

      const resObject = {
        id,
        imageid: imageId,
        createdon: createdOn,
        gifTitle: newtitle,
        comment: newComment,
      };

      return response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};


exports.getGifAndComments = (request, response) => {
  const gifid = parseInt(request.params.gifid, [10]);
  const text = 'SELECT imageid, createdon, title, imageurl FROM images WHERE imageid = $1';
  const select = 'SELECT id, authorid, comment FROM gifcomments WHERE imageid = $1';
  pool.query(text, [gifid], (error, res) => {
    if (error) {
      // throw error
      response.status(400).json({
        status: 'error',
        error: error.stack,
      });
    }
    const { imageid } = res.rows[0];
    const createdOn = res.rows[0].createdon;
    const { title } = res.rows[0];
    const imageUrl = res.rows[0].imageurl;

    return pool.query(select, [gifid], (err, result) => {
      if (err) {
        response.status(500).send('server not found for query 2');
        // throw error;
      }
      const comments = result.rows;

      const resObject = {
        imageid,
        createdon: createdOn,
        gifTitle: title,
        url: imageUrl,
        comments,
      };

      response.status(201).json({
        status: 'success',
        data: resObject,
      });
    });
  });
};
