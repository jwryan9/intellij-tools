source "${templatesPath}/git-commands/remote-checker.sh"
source "${templatesPath}/utils/runnem.sh"

function smartRebase() {
    quietly=$1
    hasUpStream=$(doesHaveUpstream)

    if [[ $hasUpStream -eq 1 ]]
    then
        runnem "git checkout master" $quietly $quietly
        runnem "git rebase upstream/master" $quietly $quietly
        runnem "git push origin master" $quietly $quietly
    else
        runnem "git checkout master" $quietly $quietly
        runnem "git pull -r" $quietly $quietly
    fi
}