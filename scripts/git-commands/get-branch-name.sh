function getBranchName(){
    local branchName=`git rev-parse --symbolic-full-name --abbrev-ref HEAD`
    echo "$branchName"
}