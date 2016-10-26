import git from './utils/git/git';
import logger from './utils/logger';
import {setLogLevel, LOG_LEVEL} from './utils/log-level';
import argumentReader from './utils/argument-reader';
import ensureOnVpn from './utils/ensure-on-vpn';

function init(args) {
    setLogLevel(LOG_LEVEL.ERR);
    argumentReader.read(args);
}

function main(args) {
    init(args);

    logger.warn('Going to remove all dead branches');

    git.dieBranchesDie();
}

module.exports = {
    main
};
