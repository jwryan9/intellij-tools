import { execute } from '../shell';
import logger from '../logger';

function getCurrentBranchName() {
    return execute('git rev-parse --symbolic-full-name --abbrev-ref HEAD').replace('\n', '');
}

module.exports = () => {
    let branchName = getCurrentBranchName();
    if (branchName !== 'master') {
        execute('git checkout master');
        branchName = getCurrentBranchName();
        if (branchName !== 'master') {
            logger.err('Could not get to Master branch. Please manually intervene.');
        }
    }
};
