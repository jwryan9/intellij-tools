'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('../shell');

var _remoteCheck = require('./remote-check');

var _remoteCheck2 = _interopRequireDefault(_remoteCheck);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function () {
    if ((0, _remoteCheck2['default'])()) {
        (0, _shell.execute)('git fetch upstream');
        _logger2['default'].debug('fetching from upstream');
    } else {
        (0, _shell.execute)('git fetch');
        _logger2['default'].debug('fetching from origin');
    }
};