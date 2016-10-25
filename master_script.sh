benchPath="${BENCH_PATH:-/c/bench/}"
echo "Using Bench path: $benchPath"
echo "Note* If you would like to use something else please set BENCH_PATH in your system variables"

templatesPath="${benchPath}intellij-live-templates/scripts/"

source "${templatesPath}bash_aliases.sh"
source "${templatesPath}linkem_scripts.sh"
source "${templatesPath}aws_scripts.sh"


echo "run  'helpme' to see a list of helper commands"

function helpme () {
    commands=( $(find ${templatesPath}  -name '*.sh' | xargs cat | grep 'function document' | sed -e 's/.*\(document.*\)().*/\1/') )
    for command in ${commands[@]}
    do
        $command
        echo " "
    done
}
