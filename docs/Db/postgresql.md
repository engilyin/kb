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


## Get `pg_hba` from SQL

It could be especially useful for RDS Aurora where you do not have access to the file itself

```sql
SELECT * FROM pg_hba_file_rules;
```