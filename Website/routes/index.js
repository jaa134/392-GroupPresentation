var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'CWRUded' });
});

router.get('/api/triviaJSON', function(req, res) {
  res.status(200).json([]);
});

router.get('/api/triviaXML', function(req, res) {
  res.status(200).json([]);
});

module.exports = router;
