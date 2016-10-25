import fetch from './fetch';
import popChanges from './pop-changes';
import stashChanges from './stash-changes';
import getBranchName from './get-branch-name';
import updateMaster from './update-master';
import updateOriginalBranchFromMaster from './update-original-branch-from-master';

import logger from '../logger';


module.exports = () => {
    let startingBranch = getBranchName();
    logger.debug('Starting Branch: ' + startingBranch);

    stashChanges();
    fetch();
    updateMaster();
    updateOriginalBranchFromMaster(startingBranch);
    popChanges();
};
