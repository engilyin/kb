# Networking

## Check open port or not

### Linux (Ubuntu)

```shell
nc -zv 192.168.56.10 20-80

# Who is listening on port 80
ss -ltnp | grep ':80' || true

# Who owns
ss -ltnp 'sport = :80'
lsof -nP -iTCP:80 -sTCP:LISTEN || true

# Check what apache host are listening on
apachectl -S

# Check whether ipv6 is enabled only
sysctl net.ipv6.bindv6only

# from the server (tests if Apache accepts IPv4)
curl -4 -svS http://127.0.0.1/ || true
curl -4 -svS http://$(hostname -I | awk '{print $1}')/ || true

# Confirm listening sockets and mapped behavior:
ss -ltnp 'sport = :80'
netstat -tlnp | grep ':80' || true
# show if the IPv6 socket is accepting IPv4-mapped addr
ss -lnp | awk '/:80/ {print $0}'

# Check for firewall / host-level blocking:
sudo iptables -L -n -v || sudo nft list ruleset
sudo ufw status verbose || true
# If on AWS/GCP, check the instance Security Group / firewall rules (via cloud console)
```

### Windows

Use PowerShell (built-in) or small tools. Examples:

PowerShell (built-in)

```ps
Test-NetConnection -ComputerName example.com -Port 80
# alias
tnc example.com -Port 80
# detailed
Test-NetConnection -ComputerName example.com -Port 80 -InformationLevel Detailed
```

Telnet (if enabled)

```
telnet example.com 80
```

If you have ncat/netcat (Nmap)

```
ncat -zv example.com 80
# or
nc -zv example.com 80
```

One-line PowerShell using .NET TcpClient
```
try{ $c=New-Object System.Net.Sockets.TcpClient; $c.Connect('example.com',80); $c.Close(); 'OPEN' } catch { 'CLOSED' }
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
