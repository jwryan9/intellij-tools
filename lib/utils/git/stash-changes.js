'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function changesExist() {
    var nothingToCommitMessageFound = (0, _shell.execute)('git status | grep -c \'nothing to commit\'');

    return nothingToCommitMessageFound === '1\n' ? false : true;
}

module.exports = function () {
    if (changesExist()) {
        (0, _shell.execute)('git stash save \'update-script-wip\'');

        _logger2['default'].debug('Stashing your changes');
    }
};