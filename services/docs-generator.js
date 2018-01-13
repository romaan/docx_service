require('dotenv').config();
var fs = require('fs');
var path = require('path');
var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

const INPUT_FILE = "input.docx";
const ERROR_FILE = "error.txt";
const OUTPUT_FILE = "output.docx";
const FINISH_FILE = "finish.txt";

var getPath = function (directory, create) {
    var create = typeof create !== "undefined" ? create : true;
    if (create && !fs.existsSync(path.resolve(process.env.STORAGE, directory))) {
        fs.mkdirSync(path.resolve(process.env.STORAGE, directory));
    }
    return path.resolve(process.env.STORAGE, directory);
};

exports.docxprocessor = function(projectId, template, data, cb) {

    setTimeout(function() {
        //Save the docx file for reference
        fs.writeFile(path.resolve(getPath(projectId), INPUT_FILE), template, "binary", function(err) {
            if (err) {
                console.error(err);
            }
        });
        var content = template;
        var zip = new JSZip(content);
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        //set the templateVariables
        doc.setData(data);
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
        }
        catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
            };
            console.log(JSON.stringify({error: e}));
            fs.writeFileSync(path.resolve(getPath(projectId), ERROR_FILE), JSON.stringify({error: e}));
            if (typeof cb === "function") {
                cb();
            }
        }

        var buf = doc.getZip().generate({type: 'nodebuffer'});

        fs.writeFile(path.resolve(getPath(projectId), OUTPUT_FILE), buf, "binary", function(err) {
            if (!err) {
                fs.closeSync(fs.openSync(path.resolve(getPath(projectId), FINISH_FILE), "a"));
                if (typeof cb === "function") {
                    cb();
                }
            }
        });
    }, 10);
};

exports.fetchdocx = function(projectId, cb)  {
    fs.readdir(getPath(projectId, false), function(err, files) {
       if (err) {
           cb({"status": "invalid id: " + projectId});
       } else if (!files.indexOf(FINISH_FILE) == -1) {
            cb({"status": "Processing"});
       } else if (files.indexOf(ERROR_FILE) != -1) {
           fs.readFile(path.resolve(getPath(projectId, false), ERROR_FILE), function(err, data) {
               cb({"status": "error", "data": new Buffer(data).toString('base64')})
           });
       } else {
           fs.readFile(path.resolve(getPath(projectId, false), OUTPUT_FILE), function(err, data) {
               cb({"status": "success", "data": new Buffer(data).toString('base64')})
           });
       }
    });
};