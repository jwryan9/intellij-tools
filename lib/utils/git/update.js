'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _popChanges = require('./pop-changes');

var _popChanges2 = _interopRequireDefault(_popChanges);

var _stashChanges = require('./stash-changes');

var _stashChanges2 = _interopRequireDefault(_stashChanges);

var _getBranchName = require('./get-branch-name');

var _getBranchName2 = _interopRequireDefault(_getBranchName);

var _updateMaster = require('./update-master');

var _updateMaster2 = _interopRequireDefault(_updateMaster);

var _updateOriginalBranchFromMaster = require('./update-original-branch-from-master');

var _updateOriginalBranchFromMaster2 = _interopRequireDefault(_updateOriginalBranchFromMaster);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function () {
    var startingBranch = (0, _getBranchName2['default'])();
    _logger2['default'].debug('Starting Branch: ' + startingBranch);

    (0, _stashChanges2['default'])();
    (0, _fetch2['default'])();
    (0, _updateMaster2['default'])();
    (0, _updateOriginalBranchFromMaster2['default'])(startingBranch);
    (0, _popChanges2['default'])();
};