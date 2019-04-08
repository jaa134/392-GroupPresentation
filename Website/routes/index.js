var express = require('express');
var router = express.Router();
var jsonxml = require('jsontoxml');
var https = require('https');

router.get('/', function(req, res) {
  res.render('index', { title: 'CWRUded' });
});

router.get('/api/triviaJSON', function(req, res) {
  https.get('https://opentdb.com/api.php?amount=20&category=18', (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.status(200).json(JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    res.status(200).json([]);
  });
});

router.get('/api/triviaXML', function(req, res) {
  res.status(200).json([]);
});

module.exports = router;
