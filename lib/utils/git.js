"use strict";

var _shell = require('./shell');

function getBranchName() {
    return (0, _shell.execute)("git rev-parse --symbolic-full-name --abbrev-ref HEAD");
}

function stashChanges(doesNotHaveChanges) {
    if (doesNotHaveChanges) {
        (0, _shell.execute)("git stash save 'update-script-wip'");
    }
}

function popChanges(doesNotHaveChanges) {
    if (doesNotHaveChanges) {
        var stashItemNumber = (0, _shell.execute)("git stash list | grep 'update-script-wip' | sed -e 's/^stash@{\\(.*\\)}.*$/\\1/')");
        (0, _shell.execute)("git stash pop stash@{" + stashItemNumber + "}");
    }
}

module.exports = {
    getBranchName: getBranchName,
    stashChanges: stashChanges,
    popChanges: popChanges
};