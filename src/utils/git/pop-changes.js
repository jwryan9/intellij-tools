import { execute } from '../shell';
import logger from '../logger';

module.exports = () => {
    let stashes = execute('git stash list').split('\n'),
        firstStash = stashes[0].split(': '),
        stashId = firstStash[0],
        stashName = firstStash[2];

    if (stashName === 'update-script-wip') {
        logger.debug('Popping stashed changes');
        execute('git stash pop ' + stashId);
    }
};
