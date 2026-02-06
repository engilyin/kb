# Apache


## Service

```shell
systemctl status apache2.service
systemctl restart apache2.service

journalctl -xeu apache2.service
```

## Configs

```shell
sudo apachectl -S
sudo apachectl configtest
```

## Logs

```shell
journalctl -u apache2 -n 200 --no-pager
tail -n 200 /var/log/apache2/error.log
```

## Troubleshoot

To check configuration

```shell
apachectl configtest
```


