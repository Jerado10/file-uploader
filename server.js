'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Set file storage for multer middleware

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb (null, '')
  },
  filename: function (req, file, cb) {
    cb (null, "req.file.filename")
  }
})
 
var upload = multer({ storage: storage })

// Post file and send json

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.json({name: req.file.originalname, size: req.file.size})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
