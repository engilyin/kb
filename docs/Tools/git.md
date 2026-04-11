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

## Create/Apply patches

You can create the patch from the not committed changes:

```
git add .
git diff --cached > changes.patch

# or with binary files

git diff --cached --binary > changes.patch

```

And apply it as easy as:

```
git apply changes.patch
```


## Revert changes

How to revert changes in the file:

```shell
git restore <file>

git checkout -- <file>
```


I did git pull --rebase and it stuck with some conflicts. How can I just overwrite the current state with the latest from the remote origin main?
```shell
git rebase --abort
git fetch origin
git reset --hard origin/main
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

Delete all worktrees
```
git worktree list | awk '{print $1}' | xargs -n1 git worktree remove --force

git worktree list | grep US-05- | awk '{print $1}' | xargs -n1 git worktree remove --force
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

## Tell GCM to remember which account to use

To set a default account for a particular remote you can simply set the following Git configuration:

```shell
git config --global credential.<URL>.username <USERNAME>
```

..where `<URL>` is the remote URL and `<USERNAME>` is the account you wish to have as the default. For example, for `github.com` and the user `alice`, you would run:

```shell
git config --global credential.https://github.com.username alice
```

If you wish to set a user for a specific repository or remote URL, you can include the account name in the remote URL. If you're using HTTPS remotes, you can include the account name in the URL by inserting it before the @ sign in the domain name.

For example, if you want to always use the `alice` account for the `mona/test` GitHub repository, you can clone it using the `alice` account by running:

```shell
git clone https://alice@github.com/mona/test
```

To update an existing clone, you can run git remote set-url to update the URL:

```shell
git remote set-url origin https://alice@github.com/mona/test
``` 
If your account name includes an `@` then remember to escape this character using `%40`: https://alice%40contoso.com@example.com/test.


See original at https://docs.github.com/en/get-started/getting-started-with-git/managing-remote-repositories#setting-a-default-account-for-a-remote-url

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


## Worktrees

```shell
git worktree add -b develop_forward ../develop_forward origin/develop_forward

git worktree list

git worktree remove ../develop_forward
git worktree remove ../develop_forward --force
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