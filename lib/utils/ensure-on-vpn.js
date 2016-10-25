'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shell = require('./shell');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = function () {
    var vpnCheckCommand = 'curl -s --connect-timeout 3 --head https://github.deere.com | head -n 1 | grep "HTTP/1.[01] [23].."',
        isOnVpn = (0, _shell.execute)(vpnCheckCommand).indexOf('Found') !== -1;

    _logger2['default'].debug('isOnVpn: ' + isOnVpn);
    if (!isOnVpn) {
        _logger2['default'].err('could not connect to Deere github.  Make sure you are on the VPN.');
        process.exit(1); //eslint-disable-line no-process-exit
    }
};