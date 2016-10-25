import {execute} from '../shell';
import logger from '../logger';

function thereWereMergeConflicts(resultsOfRebase) {
    return resultsOfRebase && resultsOfRebase.indexOf('CONFLICT') !== -1;
}

function alertUserAboutConflicts() {
    logger.err('You have conflicts that need addressing.');
    process.exit(1); //eslint-disable-line no-process-exit
}

module.exports = (branchName) => {
    var resultsOfRebase;

    logger.debug('Rebasing original branch from local master');

    execute('git checkout ' + branchName);
    resultsOfRebase = execute('git rebase master');

    if (thereWereMergeConflicts(resultsOfRebase)) {
        alertUserAboutConflicts();
    }
};
