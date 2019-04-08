var express = require('express');
var router = express.Router();
var jsonxml = require('jsontoxml');
var xml = require('xml')
var https = require('https');

router.get('/', function(req, resp) {
  resp.render('index', { title: 'CWRUded' });
});

router.get('/api/triviaJSON', function(req, resp) {
  https.get('https://opentdb.com/api.php?amount=20&category=18', (trivia_resp) => {
    let data = '';
    trivia_resp.on('data', (chunk) => {
      data += chunk;
    });
    trivia_resp.on('end', () => {
      resp.status(200).json(JSON.parse(data));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    resp.status(503).json({});
  });
});

class Document {
  constructor(data) {
    this.serverResponse = data
  }
}

router.get('/api/triviaXML', function(req, resp) {
  https.get('https://opentdb.com/api.php?amount=20&category=18&type=multiple', (trivia_resp) => {
    let data = '';
    trivia_resp.on('data', (chunk) => {
      data += chunk;
    });
    trivia_resp.on('end', () => {
      resp.set('Content-Type', 'text/xml');
      resp.status(200).send(jsonxml(new Document(JSON.parse(data))));
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    resp.status(503).json({});
  });
});

module.exports = router;
