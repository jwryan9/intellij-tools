import path from 'path';
import parse from 'xml2json';
import read from 'read-file';
import Writer from 'simple-file-writer';
import fs from 'fs';

const TEMP_READ_ME_PATH = path.join(path.dirname(__dirname), 'data', 'readme.md'),
    FINAL_READ_ME_PATH = path.join(path.dirname(__dirname), '..', 'templates', 'readme.md'),
    INPUT = path.join(path.dirname(__dirname), 'data', 'input.xml');

function writeDocumentation(documentation) {
    let writer = new Writer(TEMP_READ_ME_PATH),
        documentationString = documentation.join('\n');

    writer.write('#Live Template Documentation\n');
    writer.write(documentationString);

    writer.write('\n\n### Made with Documentor.  See /documentor/README.md');
}

function createDocumentation(jsonString) {
    let templates = JSON.parse(jsonString).templates.template,
        documentation = [];

    templates.forEach((template) => {
        documentation.push('* ' + template.name + ': ' + template.description);
    });

    return documentation;
}

function copyDocumentation() {
    fs.unlinkSync(FINAL_READ_ME_PATH); //eslint-disable-line no-sync
    fs.createReadStream(TEMP_READ_ME_PATH).pipe(fs.createWriteStream(FINAL_READ_ME_PATH));
    fs.unlinkSync(TEMP_READ_ME_PATH); //eslint-disable-line no-sync
}

function readHandler(error, buffer) {
    let jsonString = parse.toJson(buffer);
    writeDocumentation(createDocumentation(jsonString));


    copyDocumentation();
}

read(INPUT, readHandler);

