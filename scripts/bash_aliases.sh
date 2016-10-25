alias bench="cd ${benchPath}"
alias hdp="bench && cd hdp"
alias axiom="bench && cd Axiom-Platform"
alias go="bench && cd grower-ops"
alias fa="bench && cd fa"
alias timeline="bench && cd grower-timeline"
alias line="bench && cd deere-ui-line-graph"
alias live="bench && cd intellij-live-templates"
alias document="bench && cd document-live-templates"
alias init="bench && cd grower-tool-initializer"
alias draw="bench && cd deere-ui-field-space"
alias dfa="bench && cd deere-field-analyzer"
alias slider="bench && cd multi-slider"

alias scouts="bench && cd scout-server-core"
alias scouta="bench && cd scout-app"
alias scoutu="bench && cd scout-ui-core"
alias linkscout="linkem scout"
alias transscout="transpileall scout"

alias fapu="bench && cd field-analyzer-pro-ui-core"
alias faps="bench && cd field-analyzer-pro-server-core"
alias fapa="bench && cd field-analyzer-pro-app"
alias linkfa="linkem field-analyzer-pro"
alias transfa="transpileall field-analyzer-pro"
alias regions="bench && cd region-service-app"

alias ppas="bench && cd ppa-server-core"
alias ppaa="bench && cd ppa-app"
alias ppau="bench && cd ppa-ui-core"
alias linkppa="linkem ppa"
alias transppa="transpileall ppa"

alias lms="bench && cd location-manager-server-core"
alias lma="bench && cd location-manager-app"
alias lmu="bench && cd location-manager-ui-core"
alias linklm="linkem location-manager"
alias translm="transpileall location-manager"

alias rsa="bench && cd region-service-app"

alias npml="npm list --depth=0"
alias master="git checkout master"
alias newb="git checkout -b"
alias push="git push -u origin"

alias dynamo="bench && java -Djava.library.path=./dynamodb/DynamoDBLocal_lib -jar ./dynamodb/DynamoDBLocal.jar -sharedDb -port 8000"

alias ak="createAWSKeys"

function documentAliases() {
    echo "---------------------------------------------"
    echo "--------------Aliases Below------------------"
    echo "---------------------------------------------"
    echo "Key aliases:"
    echo "npml - listing all npm deps for a project"
    echo "update - updates the project via git"
    echo "bumpitup - performs an npm bump safely"
    echo "dbd - kills all branches that are not needed"
    echo "dfa - cd'ing to deere-field-analzyer"
    echo "scouta, scoutu, scouts - cd'ing to related scout dirs"
    echo "fapa, fapu, faps - cd'ing to related field analyzer pro dirs"
    echo "ppaa, ppau, ppas - cd'ing to related product performance analyzer dirs"
    echo "lma, lmu, lms - cd'ing to related location manager dirs"
    echo "linkscout, linkfa, linkppa, linklm - linking those projects"
    echo "transscout, transfa, transppa, translm - transpiling those projects"
    echo "ak [env] - create AWS keys for env (defaults to devl)"
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
