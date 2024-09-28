# PowerShell

## Enable it on Windows

```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Get-ExecutionPolicy -List


```


## Download files


```
Invoke-WebRequest -Uri http://download.sysinternals.com/files/ProcessExplorer.zip  -OutFile ProcessExplorer.zip
 
Invoke-WebRequest -Uri 'http://download.mozilla.org/?product=firefox-latest&os=win64' -OutFile Firefox.exe
 ```
