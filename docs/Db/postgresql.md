# PostgreSQL

## Install on Mac

You need to create the `postgres` user first

```
sudo dscl . -create /Users/postgres UserShell /bin/sh

sudo dscl . -create /Users/postgres NFSHomeDirectory /Library/PostgreSQL
```


## Windows troubleshooting

Checking the number of connection for PostgreSQL 9.2
```powershell
Get-Process postgres | Measure-Object
```


