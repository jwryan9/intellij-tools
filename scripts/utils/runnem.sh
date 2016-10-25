function runnem() {
    command=$1
    hideStandardOut=$2
    hideErrorOut=$3

    if [ $hideStandardOut -eq 1 ] && [ $hideErrorOut -eq 1 ]
    then
        eval $command > NUL 2> NUL
    elif [ $hideStandardOut -eq 1 ]
    then
        eval $command > NUL
    elif [ $hideErrorOut -eq 1 ]
    then
        eval $command 2> NUL
    else
        eval $command
    fi

    rm -rf NUL
}