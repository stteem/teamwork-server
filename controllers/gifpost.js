const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

//console.log('cloud', cloudinary.config())

const pool = new Pool();

exports.createGif = (req, res) => {

  const { filename} = req.file;
  const { title, userId } = req.body;
  var imageurl = '';
  //const url = req.protocol + '://' + req.get('host') + '/' + req.file.originalname; Cloudinary can't upload from localhost
  //const path = 'images/' + req.file.filename;
  // File upload (example for promise api)
  console.log('req1' ,req.file)
  console.log('body' ,req.body)
  cloudinary.uploader.upload(req.file.path, { tags: 'gifs' })
  .then(function (image) {
    console.log();
    console.log("** File Upload (Promise)");
    console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
    console.log("* " + image.public_id);
    console.log("* " + image.url);
    imageurl = image.url;
    /*res.status(201).json({
      'image_id': image.public_id,
      'imageUrl': image.url
    })*/ 
  })
  .then(()=> {
    fs.unlink(req.file.path, () => {
      console.log('Deleted uploaded file from images/!')
    });
  })
  .then(()=> {
    // Now Insert into database
    const datetime = new Date();
    var text = 'INSERT INTO images (userid, imageurl, title, datecreated, imagename) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    var values = [userId, imageurl, title, datetime, filename];

    pool.query(text, values, (error, response) => {
      if (error) {
        res.status(500).send('server not found');
        throw error;
      }
      res.status(201).json({
        status: 'success',
        data: {
          'message': 'GIF image successfully posted',
          'gifId' : response.rows[0].imageid,
          'createdOn' : response.rows[0].datecreated ,
          'title' : response.rows[0].title ,
          'imageUrl' : response.rows[0].imageurl ,
          'userId': response.rows[0].userid,
        },
      });
    });
  })
  .catch(function (err) {
    console.log();
    console.log("** File Upload (Promise)");
    if (err) { 
      console.warn(err);
      res.status(500).json('No network, please check your internet and try again!')
    }
  });
}


exports.deleteGif = (request, response) => {
  const gifid = parseInt(request.params.gifId);
  console.log('gifid',request.params)
  pool.query('DELETE FROM images WHERE imageid = $1', [gifid],
    (error, res) => {
      if (error) {
        throw error
      }
      response.status(200).json({
        status: 'success',
        data: {
          message : 'Gif post successfully deleted.'
        }
      });
  })
}