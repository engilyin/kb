# Gitbash


## Filtered history

Just create the file `.inputrc` at your home directory and paste this content into it:

```
"\e[A": history-search-backward
"\e[B": history-search-forward
```

Now you can start typing the command and use arrow up/down to navigate through the most recent commands starting with typed prefix

::warn sometimes you need to sync history across different sessions:

```
history -a
```

## Git Duet

Useful to set authors on all projects. Download and install [Git Duet](https://github.com/git-duet/git-duet/releases)

Point your `%PATH%` environment variable on that folder.

Create the `.git-authors` in your home directory. E.g.

```
authors:
  engilyin: Alex Ilin; engilyin
  ai: A Ilin; a_ilin
email:
  domain: engilyin.com
email_addresses:
  engilyin: engilyin@gmail.com
  ai: a_ilin@other.email

```

## Add Emojis support


The [source](https://gist.github.com/OlivierLDff/766ea2be17e35fb7794f2a2a9ab5fb44)

Open git bash with admin privilege.

```bash
cd "C:/Program Files/Git/usr/share/mintty"
mkdir -p emojis
cd emojis
curl https://raw.githubusercontent.com/wiki/mintty/mintty/getemojis > getemojis
./getemojis -d
```

Then edit settings via gui or `.minttyrc`

```yml
EmojiPlacement=middle
Emojis=windows
```

## Esc sequences and emoji

To make it work on git-bash.exe you can:

1. Go to `Options...` and set any of `VT*` terminal mode
2. add into your `.bashrc`:

```shell
export TERM=xterm-256color
```

::warn That does not work under IDEs because they are using `bin/bash.exe` directly.


## Integration with Visual Studio Code

Open `settings.json` from the `Settings` and search for `terminal`

Add these settings:

```json

    "terminal.integrated.defaultProfile.windows": "Git Bash",
    "terminal.integrated.profiles.windows": {
        "Git Bash": {
            "path": "C:\\Programs\\Dev\\Git\\bin\\bash.exe",
            "args": ["--login", "-i"]
        }
    },
```

## Archive folders

Archive a folder (include the folder itself) to a .tar.gz at a specific location:

```bash
tar -czf /path/to/destination/archive-name.tar.gz -C /path/to/source_parent source_folder
# example:
tar -czf /backups/project-$(date +%F).tar.gz -C /home/user project
```

Archive only the contents of a folder (not the top-level folder):

```bash
tar -czf /path/to/destination/archive-name.tar.gz -C /path/to/source_folder .
# example:
tar -czf /backups/project-$(date +%F).tar.gz -C /home/user/project .
```

If the folder is a Git repository and you want only tracked files (export current HEAD):

```bash
git -C /path/to/repo archive --format=tar HEAD | gzip > /path/to/destination/project-$(date +%F).tar.gz
```
