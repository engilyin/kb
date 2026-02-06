# Git sheet sheet


## To unstage file

```shell
git reset package-lock.json
git restore --staged package-lock.json
```

## Aliases

```shell
git config --global alias.st status
```

## Delete branch 

Locally:
```
#You can delete a merged local branch with:

git branch -d branchname

#If it's not merged, use:

git branch -D branchname
```

Remotely:
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

## Restore branches

restore the commit using 
```
git reflog --all
git checkout -b recovered-feature e4f5g6h
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

Check integrity:
```
git fsck --full
```


## Merging

$ git merge develop_forward -Xrename-threshold=25 -Xignore-space-change

## Troubleshooting

### SSL issues
If you have some problems with ssl like this:

```
fatal: unable to access 'https://git.company.com/User_Name/spring-boot-realworld-example-app.git/': SSL certificate problem: unable to get local issuer certificate
```
you can try to turn off the validation for a while

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


## Using `duet`

You can use `duet` for pair programming or simply use it to avoid setting some author name and email for every repo.
Instead you can have common `.git-authors` file in your home directory. Or you can drop this file into the root of 
your project to have per project list of authors.

Here is the sample `.git-authors`:

```
authors:
  engilyin: Alex Ilin; engilyin
  oi: Oleksandr Ilin; oleksandr_ilin
email:
  domain: engilyin.com
email_addresses:
  engilyin: engilyin@gmail.com
```

## Migrate repo to GitHub

1️⃣ Clone the source repo (everything included)

```shell
git clone --mirror https://github.com/OLD_OWNER/OLD_REPO.git
cd OLD_REPO.git
```

:::note
 --mirror = full history, all branches, all tags, refs, everything.
:::

2️⃣ Create a new empty repo on GitHub

Same or different account/org

:::warning
Do NOT initialize it (no README, no .gitignore)
:::

3️⃣ Push everything to the new repo

```shell
git push --mirror https://github.com/NEW_OWNER/NEW_REPO.git
```

✅ Done. Repo is fully migrated.