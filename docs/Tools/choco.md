# Chocolatey - Software Management for Windows

## Install

To install `choco` into the desired place you can set the env var `ChocolateyInstall` but make sure that folder doesn't exist. Then run the install script found at: https://chocolatey.org/install

## Useful commands

```

#List installed packages:
choco list

```

## MSBuild

To build legacy `.Net` apps you might need command line tools:

```
choco install visualstudio2019buildtools
```

if your apps are targeted for `.Net Framework 4.8` you'll also need:
```
choco install netfx-4.8-devpack
```
