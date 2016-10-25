'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _context = require('./context');

var _context2 = _interopRequireDefault(_context);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

module.exports = {
    execute: function execute(command) {
        var opts = {};

        if (!_context2['default'].get('verbose')) {
            opts.silent = true;
        }

        _logger2['default'].trace('command: ' + command);

        return _shelljs2['default'].exec(command, opts).stdout;
    },

    executeAndCaptureErrors: function executeAndCaptureErrors(command) {
        var executedStatment = undefined,
            opts = {};

        if (!_context2['default'].get('verbose')) {
            opts.silent = true;
        }

        _logger2['default'].trace('command: ' + command);

        executedStatment = _shelljs2['default'].exec(command, opts);

        return {
            results: executedStatment.stdout,
            error: executedStatment.stderr
        };
    }
};