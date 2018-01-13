"use strict";

var server = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Docs Page', function() {
    describe('Get', function() {
        it('should return unauthorized without basic auth', function() {
            chai.request(server)
                .get("/v1/docx/generate/unique-id-123")
                .end(function(err, res) {
                    res.should.have.status(401);
                });
        });
    });

    describe('Post', function() {
        it('should return unauthorized without basic auth', function() {
            chai.request(server)
                .post("/v1/docx/generate")
                .end(function(err, res) {
                    res.should.have.status(401);
                });
        });
    });
});