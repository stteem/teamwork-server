const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');


//multer memoryStorage returns a buffer object
const storage = multer.memoryStorage();
const upload = multer({ storage: storage /*, limits: {fileSize: 1000000}*/ }).single('image');

//Convert multer buffer object to a URI string so cloudinary uploader can read path
const dUri = new Datauri();
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

module.exports = {upload, dataUri};