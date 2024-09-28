# Git sheat sheet


## To unstage file

```shell
git reset package-lock.json
git restore --staged package-lock.json
```

## Aliases

```shell
git config --global alias.st state
```

## Delete branch 

Locally:
```
#You can delete a merged local branch with:

git branch -d branchname

#If it's not merged, use:

git branch -D branchname
```

Remotelly:
```
git push --delete origin branchname
```

Clean up unused remote branches:
```
git remote prune origin
```

Optimize local repo:
```
git gc
```

Delete unused feature/ branches
```
git branch | grep feature/ | awk '{print $1}' | xargs git branch -d
```


## Windows ssh login

```shell
eval `ssh-agent -s`
ssh-add -t1240m ~/.ssh/my_rsa
```

## Set git username localy

```shell
git config user.name "My Name"
git config user.email "my@email.com"
```

## Stash

```shell
git stash
git list
git stash pop 0
```

## Clean up repo

```shell
git clean -fdx
```


## Merging

$ git merge develop_forward -Xrename-threshold=25 -Xignore-space-change

## Troublishooting

### SSL issues
If you have some problems with ssl like this:

```
fatal: unable to access 'https://git.company.com/User_Name/spring-boot-realworld-example-app.git/': SSL certificate problem: unable to get local issuer certificate
```
you cantry to turn off the validation for a while

```shell
git config http.sslVerify false
```

### Mac `zsh` issues
If you see your `git branche` in the `vi` you may stop doing that by:

```shell
git config --global pager.branch false
```

### Extract out some submodule as a separate repo

```shell
git clone https://my-full-repo

git remote get-url origin
git remote rm origin
git remote get-url origin


git filter-branch --subdirectory-filter <submodulepath> -- --all

# Do some changes to make it build and have a final shape of the separate project

# Create new repo on remote like https://github.com/me/my-new-repo.git

git remote add origin https://github.com/me/my-new-repo.git
git remote get-url origin


# BE EXTEMALLY CAREFULL WITH THIS COMMAND:

git push --mirror origin

```

## Merge repos

You can use [script](scripts/merge-repos.sh) to merge multiple repos into single one.