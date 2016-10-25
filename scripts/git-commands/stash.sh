source "${templatesPath}/utils/runnem.sh"

function stashChanges() {
    doesNotHaveChanges=$1
    quietly=$2

    if [ $doesNotHaveChanges -eq 0 ]
    then
        runnem "git stash save 'update-script-wip'" $quietly $quietly
    fi
}

function stashPopChanges() {
    doesNotHaveChanges=$1
    quietly=$2

    if [ $doesNotHaveChanges -eq 0 ]
    then
        stashItemNumber="$(git stash list | grep 'update-script-wip' | sed -e 's/^stash@{\(.*\)}.*$/\1/')"
        runnem "git stash pop stash@{$stashItemNumber}" $quietly $quietly
    fi
}
