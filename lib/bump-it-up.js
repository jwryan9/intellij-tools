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
    (0, _utilsEnsureOnVpn2['default'])();
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

//
//
//  Down the hole we go!
//  command: git rev-parse --symbolic-full-name --abbrev-ref HEAD
//  master
//  command: npm list --depth=0 | grep '>' | xargs -n 1 | grep '@' | sed -re 's/\@.*//' | xargs npm unlink --
// sed: illegal option -- r
// usage: sed script [-Ealn] [-i extension] [file ...]
// sed [-Ealn] [-i extension] [-e script] ... [-f script_file] ... [file ...]
// npm ERR! invalid: boilerplate-server-core@0.0.0 /Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/boilerplate-server-core
// npm ERR! max depth reached: react@^0.14.0, required by boilerplate-server-core@0.0.0
// npm ERR! max depth reached: react-dom@^0.14.0, required by boilerplate-server-core@0.0.0
// npm ERR! invalid: boilerplate-ui-core@0.0.0 /Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/boilerplate-ui-core
// npm ERR! max depth reached: react@^0.14.0, required by boilerplate-ui-core@0.0.0
// npm ERR! max depth reached: react-dom@^0.14.0, required by boilerplate-ui-core@0.0.0
// command: git rev-parse --symbolic-full-name --abbrev-ref HEAD
// master
// Starting Branch: master
//
// command: git status | grep -c 'nothing to commit'
// 1
// command: git remote -v | sed -e 's/s.*$//' | wc -l
// 0
// command: git fetch
// fatal: No remote repository specified.  Please, specify either a URL or a
// remote name from which new revisions should be fetched.
//     fetching from origin
// Updating the master branch
// command: git checkout master
// Already on 'master'
// command: git remote -v | sed -e 's/s.*$//' | wc -l
// 0
// command: git pull -r
// fatal: No remote repository specified.  Please, specify either a URL or a
// remote name from which new revisions should be fetched.
//     Rebasing original branch from local master
// command: git checkout master
//
// Already on 'master'
// command: git rebase master
// Current branch master is up to date.
//     Auto packing the repository in background for optimum performance.
//     See "git help gc" for manual housekeeping.
//     command: git stash list
// command: npm prune
// command: npm i
// command: npm run
// Lifecycle scripts included in boilerplate-app:
// start
// node ./lib/boilerplate-server.js
// test
// gulp
//
// available via `npm run-script`:
// dev
// gulp dev
// zip
// zip -q -9 ../boilerplate-app.zip -r * .[^.]*
// bumping via gulp
// command: gulp bump:minor
// /Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/deere-ui-build-tasks/lib/gulp/aliases.js:20
// gulp.task('default', ['test']);
// ^
//
// TypeError: Cannot read property 'task' of undefined
// at Object.module.exports [as aliases] (/Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/deere-ui-build-tasks/lib/gulp/aliases.js:20:9)
// at /Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/deere-ui-build-tasks/index.js:12:40
// at Array.forEach (native)
// at Object.module.exports.gulp (/Users/dwisnowski/Developer/boilerplate/boilerplate-app/node_modules/deere-ui-build-tasks/index.js:11:23)
// at Object.<anonymous> (/Users/dwisnowski/Developer/boilerplate/boilerplate-app/gulpFile.js:4:12)
// at Module._compile (module.js:409:26)
// at Object.Module._extensions..js (module.js:416:10)
// at Module.load (module.js:343:32)
// at Function.Module._load (module.js:300:12)
// at Module.require (module.js:353:17)