#!/bin/bash

function move_into_subfolder () {
    local subfolder=$1
    if [ ! -z "$2" ] ; then
        subfolder=$2
    fi

    pushd $1
    mkdir $subfolder
    # git mv !($1) $1 # this bashism doesn't seem to work on windows git and is replaced by following 2 lines
    git mv `ls -1 | grep -v $subfolder` $subfolder
    git mv .gitignore $subfolder
    git mv .project $subfolder
    git mv .settings $subfolder
    git commit -a -m "Moving files into subfolder $subfolder"

    # navigate back to previous folder
    popd
}

function merge_old_repo_commits () {
    git remote add $1 ../$1
    git fetch $1
    git merge --no-edit --allow-unrelated-histories $1/develop
    git remote rm $1
}

function clone_or_pull_develop() {
    if [ ! -d "${1}" ] ; then
        git clone -b develop https://github.com/mycompany/${1}.git
    else
        pushd ${1}
        git reset HEAD~1 --hard
        git pull
        popd
    fi

    pushd ${1}
    git config user.email "my@email.com"
    git config user.name "Alex ILIN"
    popd
}

# Pull the latest develop branches and move the files in a subfolder as preparation for the merge
clone_or_pull_develop "some-prj-common"
move_into_subfolder "some-prj-common" "common"

clone_or_pull_develop "some-prj-db-client"
move_into_subfolder "some-prj-db-client" "db-client"

clone_or_pull_develop "some-prj-services"
move_into_subfolder "some-prj-services" "services"

clone_or_pull_develop "some-prj-workflow"
move_into_subfolder "some-prj-workflow" "workflow"


# Prepare a new git repo to execute the merge
cd some-prj-root

git config user.email "my@email.com"
git config user.name "Your Name"

merge_old_repo_commits "some-prj-common"
merge_old_repo_commits "some-prj-db-client"
merge_old_repo_commits "some-prj-services"
merge_old_repo_commits "some-prj-workflow"