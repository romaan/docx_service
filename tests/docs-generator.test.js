require('dotenv').config();
var docxprocessor = require('../services/docs-generator');
var fs = require('fs');
var path = require('path');
const expect = require('chai').expect

function readTemplate(fileName) {
    return fs.readFileSync(path.resolve('tests/testdata', fileName), "binary");
}
describe('DocxProcessor', function() {
    it('should process simple template', function() {
        var data ={
           "first_name": "Hipp",
           "last_name": "Edgar",
           "phone": "0652455478",
           "description": "New Website"
        };
        var id = "unique-id-1234";
        var template = readTemplate("simple.docx");
        docxprocessor.docxprocessor(id, template, data, function() {

        });
    });
    it('should process template with table', function() {

    });
});