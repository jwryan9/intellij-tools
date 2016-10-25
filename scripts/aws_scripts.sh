function createAWSKeys() {
    local ENV_ARG=$1
    if [ $# -eq 0 ]; then
        ENV_ARG="devl"
    fi

    echo "Generating AWS keys for ${ENV_ARG}"
    cd ${benchPath}/aws-shared/scripts/
    python create-keys.py -e $ENV_ARG
    cd -
}
