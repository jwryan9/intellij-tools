import {execute} from '../shell';
import remoteCheck from './remote-check';
import logger from '../logger';

function thereWereMergeConflicts(resultsOfRebase) {
    return resultsOfRebase && resultsOfRebase.indexOf('CONFLICT') !== -1;
}

function alertUserAboutConflicts() {
    logger.err('You have conflicts that need addressing.');
    process.exit(1); //eslint-disable-line no-process-exit
}

module.exports = () => {
    let resultsOfRebase;
    logger.debug('Updating the master branch');

    execute('git checkout master');

    if (remoteCheck()) {
        resultsOfRebase = execute('git rebase upstream/master');
        if (thereWereMergeConflicts(resultsOfRebase)) {
            alertUserAboutConflicts();
        } else {
            execute('git push origin master');
        }
    } else {
        resultsOfRebase = execute('git pull -r');
        if (thereWereMergeConflicts(resultsOfRebase)) {
            alertUserAboutConflicts();
        }
    }
};
