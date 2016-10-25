'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _remoteCheck = require('./remote-check');

var _remoteCheck2 = _interopRequireDefault(_remoteCheck);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function thereWereMergeConflicts(resultsOfRebase) {
    return resultsOfRebase && resultsOfRebase.indexOf('CONFLICT') !== -1;
}

function alertUserAboutConflicts() {
    _logger2['default'].err('You have conflicts that need addressing.');
    process.exit(1); //eslint-disable-line no-process-exit
}

module.exports = function () {
    var resultsOfRebase = undefined;
    _logger2['default'].debug('Updating the master branch');

    (0, _shell.execute)('git checkout master');

    if ((0, _remoteCheck2['default'])()) {
        resultsOfRebase = (0, _shell.execute)('git rebase upstream/master');
        if (thereWereMergeConflicts(resultsOfRebase)) {
            alertUserAboutConflicts();
        } else {
            (0, _shell.execute)('git push origin master');
        }
    } else {
        resultsOfRebase = (0, _shell.execute)('git pull -r');
        if (thereWereMergeConflicts(resultsOfRebase)) {
            alertUserAboutConflicts();
        }
    }
};