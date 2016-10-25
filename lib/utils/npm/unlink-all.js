'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function () {
    var npml = (0, _shell.execute)('npm list --depth=0'),
        lines = npml.split('\n'),
        depStringsToUnlink = lines.filter(function (line) {
        return line.indexOf('>') > 0;
    }),
        depsToUnlink = depStringsToUnlink.map(function (depString) {
        var namePlusVersion = depString.split('── ')[1];
        return namePlusVersion.split('@')[0];
    });

    depsToUnlink.forEach(function (depToUnlink) {
        (0, _shell.execute)('npm unlink ' + depToUnlink);
    });

    var retVal = (0, _shell.executeAndCaptureErrors)('npm i');
    if (retVal.error.indexOf('invalid') > 0 || retVal.error.indexOf('404 Not Found') > 0) {
        _logger2['default'].err('failed to npm install all deps. run npml to find out what is wrong.');
        process.exit(1); //eslint-disable-line no-process-exit
    }
};