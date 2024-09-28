# Networding

## Check open port or not

```shell
nc -zv 192.168.56.10 20-80
```


## TCP Dump

```shell
tcpdump -i eth0 -C20 -W20 host 192.168.0.90 -s6103 -w /tmp/tcpd192.168.0.90.cap &
```


## Troubleshooting


### SSH returns: no matching host key type found. Their offer: ssh-dss

You need to add `-oHostKeyAlgorithms=+ssh-dss`

```
ssh -oHostKeyAlgorithms=+ssh-dss root@192.168.8.109
```
