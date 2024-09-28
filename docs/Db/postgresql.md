# PostgreSQL

## Install on Mac

You need to create the `postgres` user first

```
sudo dscl . -create /Users/postgres UserShell /bin/sh

sudo dscl . -create /Users/postgres NFSHomeDirectory /Library/PostgreSQL
```
