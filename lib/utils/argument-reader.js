'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _logLevel = require('./log-level');

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var LOG_LEVELS = [_logLevel.LOG_LEVEL.ERR, _logLevel.LOG_LEVEL.WARN, _logLevel.LOG_LEVEL.DEBUG, _logLevel.LOG_LEVEL.TRACE];

function displayHelpMessage() {
    _logger2['default'].warn('-v or --verbose to print summary');
    _logger2['default'].warn('-i or --install to install node modules');
    _logger2['default'].warn('-l or --level \<level\> to set logger level (DEBUG, TRACE, ERR)');
    _logger2['default'].warn('-d or --debug to set logger level to DEBUG');
    process.exit(0); //eslint-disable-line no-process-exit
}

module.exports = {
    read: function read(args) {
        if (!args) {
            return;
        }

        var inputArgs = (0, _minimist2['default'])(args); //outputs in the form of { _: [], a: 'beep', b: 'boop' }

        _logger2['default'].debug('inputArgs: ' + JSON.stringify(inputArgs));

        if (inputArgs._) {
            _logger2['default'].trace('pwd: ' + inputArgs._[0]);
        }

        if (inputArgs.h || inputArgs.help) {
            displayHelpMessage();
        }

        if (inputArgs.v || inputArgs.verbose) {
            _context2['default'].put('verbose', true);
        }

        if (inputArgs.i || inputArgs.install) {
            _context2['default'].put('install', true);
        }

        if (inputArgs.d || inputArgs.debug) {
            (0, _logLevel.setLogLevel)(_logLevel.LOG_LEVEL.DEBUG);

            _logger2['default'].debug('just set log level to DEBUG');
        }

        if (inputArgs.t || inputArgs.trace) {
            (0, _logLevel.setLogLevel)(_logLevel.LOG_LEVEL.TRACE);

            _logger2['default'].trace('just set log level to TRACE');
        }

        if (inputArgs.l || inputArgs.level) {
            var levelToSet = inputArgs.l || inputArgs.level;

            if (_lodash2['default'].includes(LOG_LEVELS, levelToSet)) {
                (0, _logLevel.setLogLevel)(levelToSet);

                _logger2['default'].debug('just set log level to ' + levelToSet);
            } else {
                (0, _logLevel.setLogLevel)(_logLevel.LOG_LEVEL.ERR);

                _logger2['default'].debug('just set log level to ERR');
            }
        }
    }
};