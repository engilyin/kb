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


## Uninstall WSL

```
dism.exe /online /disable-feature /featurename:Microsoft-Windows-Subsystem-Linux /norestart
```


## Useful commands

```
# Convert PNG to Base64
powershell -NoProfile -Command "[Convert]::ToBase64String([IO.File]::ReadAllBytes('D:\Path\icon.png')) | Out-File -FilePath 'D:\Path\icon.b64' -Encoding ascii
```