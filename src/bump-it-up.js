import logger from './utils/logger';
import {setLogLevel, LOG_LEVEL} from './utils/log-level';
import argumentReader from './utils/argument-reader';
import ensureOnVpn from './utils/ensure-on-vpn';
import {prompt} from 'inquirer';
import git from './utils/git/git';
import npm from './utils/npm/npm';
import bump from './utils/bump';

const NO = 'Blue pill \<Exits\>',
    YES = 'Red pill \<Bumps!\>',
    BUMP_TYPE_QUESTION = {
        name: 'bumpType',
        message: 'Enter the version bump type:',
        type: 'list',
        choices: ['Major', 'Minor', 'Patch']
    },
    ARE_YOU_SURE = {
        name: 'areYouSure',
        message: '\n\nYou take the blue pill, the story ends.\n'
        + 'You wake up in your bed and believe whatever you want to believe.\n'
        + 'You take the red pill, you stay in Wonderland,\n'
        + 'and I show you how deep the rabbit hole goes.\n',
        type: 'list',
        choices: [NO, YES]
    },
    BUNNY =
        '                                 ' + '\n'
        + '                          .|.    ' + '\n'
        + '                         /  |    ' + '\n'
        + '                        /  /     ' + '\n'
        + '                       / ,|      ' + '\n'
        + '           .-------.--- /        ' + '\n'
        + '          |._ __.-/ o. o\        ' + '\n'
        + '                 (    Y  )       ' + '\n'
        + '                  )     /        ' + '\n'
        + '                 /     (         ' + '\n'
        + '                /       Y        ' + '\n'
        + '            .-|         |        ' + '\n'
        + '           /  _     \    \       ' + '\n'
        + '          /    |. |. ) /| )      ' + '\n'
        + '         Y       )( / /(,/       ' + '\n'
        + '        ,|      /     )          ' + '\n'
        + '       ( |     /     /           ' + '\n'
        + '        \` \_  (__   (__         ' + '\n'
        + '            \`-._,)--._,)        ' + '\n'
        + '                                 ' + '\n'
        + 'Down the hole we go!';

function init(args) {
    setLogLevel(LOG_LEVEL.ERR);
    argumentReader.read(args);
}

function bumpHandler(results) {
    if (results.areYouSure === YES) {
        console.log(BUNNY); //eslint-disable-line no-console

        git.ensureOnMaster();
        npm.unlinkAll();
        git.update();
        npm.prune();
        npm.install();
        bump(results.bumpType.toLowerCase());
    } else {
        process.exit(0); //eslint-disable-line no-process-exit
    }
}

function main(args) {
    init(args);

    logger.warn('Going to bump it up');

    prompt([BUMP_TYPE_QUESTION, ARE_YOU_SURE]).then(bumpHandler); //eslint-disable-line no-alert
}

module.exports = {
    main
};
