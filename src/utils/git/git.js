import fetch from './fetch';
import dieBranchesDie from './die-branches-die';
import ensureOnMaster from './ensure-on-master';
import popChanges from './pop-changes';
import stashChanges from './stash-changes';
import getBranchName from './get-branch-name';
import updateMaster from './update-master';
import updateOriginalBranchFromMaster from './update-original-branch-from-master';
import update from './update';

module.exports = {
    dieBranchesDie,
    ensureOnMaster,
    fetch,
    getBranchName,
    popChanges,
    stashChanges,
    updateMaster,
    updateOriginalBranchFromMaster,
    update
};
