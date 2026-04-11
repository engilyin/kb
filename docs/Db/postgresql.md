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

## All active queries

```sql
SELECT
    pid,
    usename,
    datname,
    client_addr,
    application_name,
    state,
    wait_event_type,
    wait_event,
    backend_start,
    query_start,
    now() - query_start AS runtime,
    query
FROM
    pg_stat_activity
WHERE
    state = 'active'
ORDER BY
    runtime DESC;
```

### Gracefully cancel a query (leaves the session open):

```sql
SELECT pg_cancel_backend(PID);
```

### Forcefully terminate the entire session:

```sql
SELECT pg_terminate_backend(PID);
```
