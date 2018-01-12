var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
require('dotenv').config();

var fs = require('fs');
var path = require('path');

exports.docxprocessor = function() {
    //Load the docx file as a binary
    var content = fs.readFileSync(path.resolve(process.env.STORAGE, 'input.docx'), 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    //set the templateVariables
    doc.setData({
        "table1": {
            "data": [
                [
                    "Age",
                    "44",
                    "33",
                    "42",
                    "19"
                ],
                [
                    "Address",
                    "3374 Olen Thomas Drive Frisco Texas 75034",
                    "352 Illinois Avenue Yamhill Oregon(OR) 97148",
                    "1402 Pearcy Avenue Fort Wayne  Indiana(IN) 46804",
                    "3088 Terry Lane Orlando Florida(FL) 32801"
                ]
            ],
            "fixedColumns": [
                null,
                null,
                null,
                null,
                null
            ],
            "widths": [
                80,
                110,
                110,
                110,
                110
            ],
            "header": [
                "Table",
                "1",
                "2",
                "3",
                "4"
            ],
            "subheader": [
                "Name",
                "John",
                "Mary",
                "Larry",
                "Tom"
            ],
            "chunkSize": {
                "type": "dynamic",
                "size": {
                    "min": 9000,
                    "max": 9100
                }
            }
        }
    });

    try {
        // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
        doc.render()
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({error: e}));
        // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
        throw error;
    }

    var buf = doc.getZip()
                 .generate({type: 'nodebuffer'});

    // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
    fs.writeFileSync(path.resolve(process.env.STORAGE, 'output.docx'), buf);
}
