"use strict";

var server = require('../app');
var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Index Page', function() {
    describe('Swagger', function() {
        it('should open swagger document', function() {
            chai.request(server)
                .get("/")
                .end(function(err, res) {
                   res.should.have.status(200);
                });
        });

    });
});