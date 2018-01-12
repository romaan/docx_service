var express = require('express');
var router = express.Router();
var docxservice = require('../services/docs-generator');

/* GET home page. */
router.get('/', function(req, res, next) {
  docxservice.docxprocessor();
  res.render('index', { title: 'Express' });
});

module.exports = router;
