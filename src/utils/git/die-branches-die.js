import {execute} from '../shell';
import logger from '../logger';
import fetch from './fetch';
import ensureOnMaster from './ensure-on-master';

function removeBranchesInCacheNoLongerOnRemote() {
    fetch();
    execute('git remote prune origin');
}

function removeBranchesThatHaveBeenMergedWithMaster() {
    let staleBranches = execute('git branch --merged | grep -v \'master\'').split('\n');
    if (staleBranches && staleBranches[0] !== '') {
        staleBranches.map((branch) => {
            execute('git branch -d ' + branch);
        });
    }
}

module.exports = () => {
    logger.debug('removing old branches');

    ensureOnMaster();

    removeBranchesInCacheNoLongerOnRemote();

    removeBranchesThatHaveBeenMergedWithMaster();
};
