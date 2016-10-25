import { execute } from '../shell';
import logger from '../logger';

function changesExist() {
    let nothingToCommitMessageFound = execute('git status | grep -c \'nothing to commit\'');

    return nothingToCommitMessageFound === '1\n' ? false : true;
}

module.exports = () => {
    if (changesExist()) {
        execute('git stash save \'update-script-wip\'');

        logger.debug('Stashing your changes');
    }
};
