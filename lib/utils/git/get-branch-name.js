'use strict';

var _shell = require('../shell');

module.exports = function () {
    return (0, _shell.execute)('git rev-parse --symbolic-full-name --abbrev-ref HEAD');
};