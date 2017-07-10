'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsGitGit = require('./utils/git/git');

var _utilsGitGit2 = _interopRequireDefault(_utilsGitGit);

var _utilsLogger = require('./utils/logger');

var _utilsLogger2 = _interopRequireDefault(_utilsLogger);

var _utilsLogLevel = require('./utils/log-level');

var _utilsArgumentReader = require('./utils/argument-reader');

var _utilsArgumentReader2 = _interopRequireDefault(_utilsArgumentReader);

var _utilsEnsureOnVpn = require('./utils/ensure-on-vpn');

var _utilsEnsureOnVpn2 = _interopRequireDefault(_utilsEnsureOnVpn);

function init(args) {
    (0, _utilsLogLevel.setLogLevel)(_utilsLogLevel.LOG_LEVEL.ERR);
    _utilsArgumentReader2['default'].read(args);
}

function main(args) {
    init(args);

    _utilsLogger2['default'].warn('Going to remove all dead branches');

    _utilsGitGit2['default'].dieBranchesDie();
}

module.exports = {
    main: main
};