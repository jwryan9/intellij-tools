'use strict';

var _shell = require('../shell');

module.exports = function () {
    var lineCount = (0, _shell.execute)('git remote -v | sed -e \'s/\s.*$//\' | wc -l');

    if (lineCount > 2) {
        return true;
    }

    return false;
};