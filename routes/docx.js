var express = require('express');
var router = express.Router();
var docxservice = require('../services/docs-generator');
var randomID = require("random-id");
var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name === process.env.AUTH_USER && user.pass === process.env.AUTH_PASSWORD) {
        return next();
    } else {
        return unauthorized(res);
    };
};

router.get('/generate/:id', auth, function(req, res, next) {
    console.log(req.params.id);
    res.setHeader('Content-Type', 'application/json');
    docxservice.fetchdocx(req.params.id, function(data) {
        res.json(data);
    });
});

router.post('/generate', auth, function(req, res, next) {
    const id = randomID();
    docxservice.docxprocessor(id, Buffer.from(req.body.template, 'base64'), req.body.data);
    res.json({id: id});
});

module.exports = router;
