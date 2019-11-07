const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif'
};

//The multer package needs to know the destination for the file and the desired filename.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //file.mimetype in MIME_TYPES ? callback(null, 'images') : callback('Only gif files are supported', false);
    if (MIME_TYPES.hasOwnProperty(file.mimetype)) {
      callback(null, 'images');
    }
    else{
      callback('Only gif files are supported', false);
    }
    
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    //console.log('req', file)
    //We need to use a file's MIME type to determine its format, and thereby derive its extension.
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');