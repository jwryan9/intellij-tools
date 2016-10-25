'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

function thereWereMergeConflicts(resultsOfRebase) {
    return resultsOfRebase && resultsOfRebase.indexOf('CONFLICT') !== -1;
}

function alertUserAboutConflicts() {
    _logger2['default'].err('You have conflicts that need addressing.');
    process.exit(1); //eslint-disable-line no-process-exit
}

module.exports = function (branchName) {
    var resultsOfRebase;

    _logger2['default'].debug('Rebasing original branch from local master');

    (0, _shell.execute)('git checkout ' + branchName);
    resultsOfRebase = (0, _shell.execute)('git rebase master');

    if (thereWereMergeConflicts(resultsOfRebase)) {
        alertUserAboutConflicts();
    }
};