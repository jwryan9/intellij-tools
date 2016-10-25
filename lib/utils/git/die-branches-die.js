'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _ensureOnMaster = require('./ensure-on-master');

var _ensureOnMaster2 = _interopRequireDefault(_ensureOnMaster);

function removeBranchesInCacheNoLongerOnRemote() {
    (0, _fetch2['default'])();
    (0, _shell.execute)('git remote prune origin');
}

function removeBranchesThatHaveBeenMergedWithMaster() {
    var staleBranches = (0, _shell.execute)('git branch --merged | grep -v \'master\'').split('\n');
    if (staleBranches && staleBranches[0] !== '') {
        staleBranches.map(function (branch) {
            (0, _shell.execute)('git branch -d ' + branch);
        });
    }
}

module.exports = function () {
    _logger2['default'].debug('removing old branches');

    (0, _ensureOnMaster2['default'])();

    removeBranchesInCacheNoLongerOnRemote();

    removeBranchesThatHaveBeenMergedWithMaster();
};