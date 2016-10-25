#---------Usage------
#   hasUpStream=$(doesHaveUpstream)
#    if [[ $hasUpStream -eq 1 ]]
#    then
#        echo '* Updated from upstream'
#    else
#        echo '* Updated from origin'
#    fi
#---------Alternate Usage---------
# doesHaveUpstream || return 1

function doesHaveUpstream(){
    local lineCount=$(privateGetRemoteLineCount)

    if [[ $lineCount -gt 2 ]]
    then
        echo "1"
        return 1
    else
        echo "0"
        return 0
    fi
}











#----------------------------------------------
#-----Private helper methods below-------------
#----------------------------------------------

function privateGetRemoteLineCount(){
    local results=`git remote -v | sed -e 's/\s.*$//' | wc -l`
    echo "$results"
}
