import {execute} from '../shell';
import remoteCheck from './remote-check';
import logger from '../logger';

module.exports = () => {
    if (remoteCheck()) {
        execute('git fetch upstream');
        logger.debug('fetching from upstream');
    } else {
        execute('git fetch');
        logger.debug('fetching from origin');
    }
};
