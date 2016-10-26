import git from './utils/git/git';
import npm from './utils/npm/npm';
import logger from './utils/logger';
import {setLogLevel, LOG_LEVEL} from './utils/log-level';
import argumentReader from './utils/argument-reader';
import ensureOnVpn from './utils/ensure-on-vpn';
import context from './utils/context';

function runAnyInstallsIfNeeded() {
    if (context.get('install')) {
        logger.warn('installing node modules');
        npm.install();
    }
}

function init(args) {
    setLogLevel(LOG_LEVEL.ERR);
    argumentReader.read(args);
}

function main(args) {
    init(args);

    logger.warn('Updating your project... Sit back and watch me go !!!');

    git.update();

    runAnyInstallsIfNeeded();
}

module.exports = {
    main
};
