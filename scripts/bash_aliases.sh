alias bench="cd ${benchPath}"

alias bpa="bench && cd boilerplate/boilerplate-app"
alias bpu="bench && cd boilerplate/boilerplate-ui-core"
alias bps="bench && cd boilerplate/boilerplate-server-core"

alias npml="npm list --depth=0"
alias master="git checkout master"
alias newb="git checkout -b"
alias push="git push -u origin"


function documentAliases() {
    echo "---------------------------------------------"
    echo "--------------Aliases Below------------------"
    echo "---------------------------------------------"
    echo "Key aliases:"
    echo "npml - listing all npm deps for a project"
    echo "update - updates the project via git"
    echo "bumpitup - performs an npm bump safely"
    echo "dbd - kills all branches that are not needed"
    echo "---------"
    echo "Want to see all aliases?  'cat ${benchPath}intellij-live-templates/scripts/bash_aliases.txt"
}




#New Scripts and aliases found below
if [ "$(uname)" == "Darwin" ]; then
    # Do something under Mac OS X platform
    echo "On a Mac os machine"
    cmdPrefix="x=$(pwd) && node ${benchPath}/intellij-live-templates/lib"

    alias update="${cmdPrefix}/cli/update.cli.js $x"
    alias dbd="${cmdPrefix}/cli/die-branches-die.cli.js $x"
    alias bumpitup="${cmdPrefix}/cli/bump-it-up.cli.js $x"

elif [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    # Do something under GNU/Linux platform
    echo "On a Linux machine"
    cmdPrefix="x=$(pwd) && node ${benchPath}/intellij-live-templates/lib"

    alias update="${cmdPrefix}/cli/update.cli.js $x"
    alias dbd="${cmdPrefix}/cli/die-branches-die.cli.js $x"
    alias bumpitup="${cmdPrefix}/cli/bump-it-up.cli.js $x"

elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    # Do something under Windows NT platform
    echo "On a Windows machine"
    benchPath2="${benchPath:3}"
    cmdPrefix2="x=$(pwd) && node C:/${benchPath2}intellij-live-templates/lib"

    alias bumpitup="${cmdPrefix2}/cli/bump-it-up.cli.js $x"
    alias update="${cmdPrefix2}/cli/update.cli.js $x"
    alias dbd="${cmdPrefix2}/cli/die-branches-die.cli.js $x"
fi

alias diebranchesdie="dbd"
alias dbdl="dbd -t -v -d"
alias updatel="update -t -v -d"
alias bumpitupl="bumpitup -t -v -d"
