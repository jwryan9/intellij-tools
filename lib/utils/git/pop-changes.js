'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function () {
    var stashes = (0, _shell.execute)('git stash list').split('\n'),
        firstStash = stashes[0].split(': '),
        stashId = firstStash[0],
        stashName = firstStash[2];

    if (stashName === 'update-script-wip') {
        _logger2['default'].debug('Popping stashed changes');
        (0, _shell.execute)('git stash pop ' + stashId);
    }
};