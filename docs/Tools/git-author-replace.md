# How to replace the git authors

There are two slightly different problems here:

1. **Rewrite all commit authors/committers in history**
2. **Make sure no old names/emails leak via reflog**

I’ll walk you through the *clean, modern, safe* way.

---

## Big warning first (important)

What you’re about to do **rewrites Git history**.

That means:

* Commit SHAs will change
* You must **force-push** after
* Anyone who already cloned the repo will need to re-clone

Since you haven’t uploaded it yet — this is the perfect moment.

---

## Best tool: `git filter-repo` (recommended)

Forget `git filter-branch` — it’s slow and deprecated.
`git filter-repo` is fast, safe, and officially recommended by Git.

### 1. Install `git filter-repo`

**macOS**

```bash
brew install git-filter-repo
```

**Linux (pip)**

```bash
pip install git-filter-repo
```

**Windows**

```bash
pip install git-filter-repo
```

Verify:

```bash
git filter-repo --help
```

---

## Option A — Replace *all* authors & committers with one name/email

This is the simplest and most brutal (and often what people want).

```bash
git filter-repo --commit-callback '
commit.author_name = b"Your Name"
commit.author_email = b"your@email.com"
commit.committer_name = b"Your Name"
commit.committer_email = b"your@email.com"
'
```

✅ Every commit
✅ Every branch
✅ Every tag

After this, **no old names/emails remain in commit history**.

---

## Option B — Replace only specific wrong names/emails

If you want to keep correct authors and only fix mistakes:

```bash
git filter-repo --mailmap <<'EOF'
Wrong Name <wrong@email.com>  Correct Name <correct@email.com>
Another Name <another@bad.com> Correct Name <correct@email.com>
EOF
```

This:

* Rewrites history
* Fixes only listed identities
* Leaves others untouched

---

## Very important: clean the reflog

Even after rewriting commits, **reflog can still contain old identities locally**.

Run these commands **after** `filter-repo`:

```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

This removes:

* Old commit references
* Reflog entries pointing to rewritten history

---

## Verify that nothing leaks

Check commit history:

```bash
git log --format='%an <%ae>' | sort | uniq
```

Check committers too:

```bash
git log --format='%cn <%ce>' | sort | uniq
```

You should see **only** the names/emails you expect.

---

## Before uploading to GitHub / GitLab

When you push:

```bash
git push --force --all
git push --force --tags
```

(Force is required because history changed.)

---

## One more subtle thing people forget

Git also stores identity in **local config**, not history:

```bash
git config --global user.name
git config --global user.email
```

Set them correctly so you don’t repeat the mistake:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```




