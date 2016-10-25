'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function getCurrentBranchName() {
    return (0, _shell.execute)('git rev-parse --symbolic-full-name --abbrev-ref HEAD').replace('\n', '');
}

module.exports = function () {
    var branchName = getCurrentBranchName();
    if (branchName !== 'master') {
        (0, _shell.execute)('git checkout master');
        branchName = getCurrentBranchName();
        if (branchName !== 'master') {
            _logger2['default'].err('Could not get to Master branch. Please manually intervene.');
        }
    }
};