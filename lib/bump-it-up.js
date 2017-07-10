'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _utilsLogger = require('./utils/logger');

var _utilsLogger2 = _interopRequireDefault(_utilsLogger);

var _utilsLogLevel = require('./utils/log-level');

var _utilsArgumentReader = require('./utils/argument-reader');

var _utilsArgumentReader2 = _interopRequireDefault(_utilsArgumentReader);

var _utilsEnsureOnVpn = require('./utils/ensure-on-vpn');

var _utilsEnsureOnVpn2 = _interopRequireDefault(_utilsEnsureOnVpn);

var _inquirer = require('inquirer');

var _utilsGitGit = require('./utils/git/git');

var _utilsGitGit2 = _interopRequireDefault(_utilsGitGit);

var _utilsNpmNpm = require('./utils/npm/npm');

var _utilsNpmNpm2 = _interopRequireDefault(_utilsNpmNpm);

var _utilsBump = require('./utils/bump');

var _utilsBump2 = _interopRequireDefault(_utilsBump);

var NO = 'Blue pill \<Exits\>',
    YES = 'Red pill \<Bumps!\>',
    BUMP_TYPE_QUESTION = {
    name: 'bumpType',
    message: 'Enter the version bump type:',
    type: 'list',
    choices: ['Major', 'Minor', 'Patch']
},
    ARE_YOU_SURE = {
    name: 'areYouSure',
    message: '\n\nYou take the blue pill, the story ends.\n' + 'You wake up in your bed and believe whatever you want to believe.\n' + 'You take the red pill, you stay in Wonderland,\n' + 'and I show you how deep the rabbit hole goes.\n',
    type: 'list',
    choices: [NO, YES]
},
    BUNNY = '                                 ' + '\n' + '                          .|.    ' + '\n' + '                         /  |    ' + '\n' + '                        /  /     ' + '\n' + '                       / ,|      ' + '\n' + '           .-------.--- /        ' + '\n' + '          |._ __.-/ o. o\        ' + '\n' + '                 (    Y  )       ' + '\n' + '                  )     /        ' + '\n' + '                 /     (         ' + '\n' + '                /       Y        ' + '\n' + '            .-|         |        ' + '\n' + '           /  _     \    \       ' + '\n' + '          /    |. |. ) /| )      ' + '\n' + '         Y       )( / /(,/       ' + '\n' + '        ,|      /     )          ' + '\n' + '       ( |     /     /           ' + '\n' + '        \` \_  (__   (__         ' + '\n' + '            \`-._,)--._,)        ' + '\n' + '                                 ' + '\n' + 'Down the hole we go!';

function init(args) {
    (0, _utilsLogLevel.setLogLevel)(_utilsLogLevel.LOG_LEVEL.ERR);
    _utilsArgumentReader2['default'].read(args);
}

function bumpHandler(results) {
    if (results.areYouSure === YES) {
        console.log(BUNNY); //eslint-disable-line no-console

        _utilsGitGit2['default'].ensureOnMaster();
        _utilsNpmNpm2['default'].unlinkAll();
        _utilsGitGit2['default'].update();
        _utilsNpmNpm2['default'].prune();
        _utilsNpmNpm2['default'].install();
        (0, _utilsBump2['default'])(results.bumpType.toLowerCase());
    } else {
        process.exit(0); //eslint-disable-line no-process-exit
    }
}

function main(args) {
    init(args);

    _utilsLogger2['default'].warn('Going to bump it up');

    (0, _inquirer.prompt)([BUMP_TYPE_QUESTION, ARE_YOU_SURE]).then(bumpHandler); //eslint-disable-line no-alert
}

module.exports = {
    main: main
};