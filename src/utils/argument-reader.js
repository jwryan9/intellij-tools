import minimist from 'minimist';
import logger from './logger';
import {setLogLevel, LOG_LEVEL} from './log-level';
import context from './context';
import _ from 'lodash';

const LOG_LEVELS = [
    LOG_LEVEL.ERR,
    LOG_LEVEL.WARN,
    LOG_LEVEL.DEBUG,
    LOG_LEVEL.TRACE
];

function displayHelpMessage() {
    logger.warn('-v or --verbose to print summary');
    logger.warn('-i or --install to install node modules');
    logger.warn('-l or --level \<level\> to set logger level (DEBUG, TRACE, ERR)');
    logger.warn('-d or --debug to set logger level to DEBUG');
    process.exit(0); //eslint-disable-line no-process-exit
}

module.exports = {
    read(args) {
        if (!args) {
            return;
        }

        let inputArgs = minimist(args); //outputs in the form of { _: [], a: 'beep', b: 'boop' }

        logger.debug('inputArgs: ' + JSON.stringify(inputArgs));

        if (inputArgs._) {
           logger.trace('pwd: ' + inputArgs._[0]);
        }

        if (inputArgs.h || inputArgs.help) {
            displayHelpMessage();
        }

        if (inputArgs.v || inputArgs.verbose) {
            context.put('verbose', true);
        }

        if (inputArgs.i || inputArgs.install) {
            context.put('install', true);
        }

        if (inputArgs.d || inputArgs.debug) {
            setLogLevel(LOG_LEVEL.DEBUG);

            logger.debug('just set log level to DEBUG');
        }

        if (inputArgs.t || inputArgs.trace) {
            setLogLevel(LOG_LEVEL.TRACE);

            logger.trace('just set log level to TRACE');
        }

        if (inputArgs.l || inputArgs.level) {
            let levelToSet = inputArgs.l || inputArgs.level;

            if (_.includes(LOG_LEVELS, levelToSet)) {
                setLogLevel(levelToSet);

                logger.debug('just set log level to ' + levelToSet);
            } else {
                setLogLevel(LOG_LEVEL.ERR);

                logger.debug('just set log level to ERR');
            }
        }
    }
};
