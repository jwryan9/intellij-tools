'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _npmNpm = require('./npm/npm');

var _npmNpm2 = _interopRequireDefault(_npmNpm);

var _gulpGulp = require('./gulp/gulp');

var _gulpGulp2 = _interopRequireDefault(_gulpGulp);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function (bumpType) {
    if (_npmNpm2['default'].listScripts().indexOf('  bump\n') > 0) {
        _logger2['default'].debug('bumping via npm');
        _npmNpm2['default'].bump(bumpType);
    } else {
        _logger2['default'].debug('bumping via gulp');
        _gulpGulp2['default'].bump(bumpType);
    }
};