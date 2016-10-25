'use strict';

var _shell = require('../shell');

module.exports = function (bumpType) {
    (0, _shell.execute)('gulp bump:' + bumpType);
};