'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _xml2json = require('xml2json');

var _xml2json2 = _interopRequireDefault(_xml2json);

var _readFile = require('read-file');

var _readFile2 = _interopRequireDefault(_readFile);

var _simpleFileWriter = require('simple-file-writer');

var _simpleFileWriter2 = _interopRequireDefault(_simpleFileWriter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var TEMP_READ_ME_PATH = _path2['default'].join(_path2['default'].dirname(__dirname), 'data', 'readme.md'),
    FINAL_READ_ME_PATH = _path2['default'].join(_path2['default'].dirname(__dirname), '..', 'templates', 'readme.md'),
    INPUT = _path2['default'].join(_path2['default'].dirname(__dirname), 'data', 'input.xml');

function writeDocumentation(documentation) {
    var writer = new _simpleFileWriter2['default'](TEMP_READ_ME_PATH),
        documentationString = documentation.join('\n');

    writer.write('#Live Template Documentation\n');
    writer.write(documentationString);

    writer.write('\n\n### Made with Documentor.  See /documentor/README.md');
}

function createDocumentation(jsonString) {
    var templates = JSON.parse(jsonString).templates.template,
        documentation = [];

    templates.forEach(function (template) {
        documentation.push('* ' + template.name + ': ' + template.description);
    });

    return documentation;
}

function copyDocumentation() {
    _fs2['default'].unlinkSync(FINAL_READ_ME_PATH); //eslint-disable-line no-sync
    _fs2['default'].createReadStream(TEMP_READ_ME_PATH).pipe(_fs2['default'].createWriteStream(FINAL_READ_ME_PATH));
    _fs2['default'].unlinkSync(TEMP_READ_ME_PATH); //eslint-disable-line no-sync
}

function readHandler(error, buffer) {
    var jsonString = _xml2json2['default'].toJson(buffer);
    writeDocumentation(createDocumentation(jsonString));

    copyDocumentation();
}

(0, _readFile2['default'])(INPUT, readHandler);