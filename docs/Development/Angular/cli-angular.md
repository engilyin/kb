# CLI Angular app howto

## Instsll Angular

```shell
npm install -g @angular/cli
ng --version



#reinstall

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

nvm install --lts
sudo npm uninstall -g @angular/cli
sudo npm install -g @angular/cli@latest
```

See for installing the `mvn`:
https://github.com/nvm-sh/nvm#installing-and-updating

On Windows you can need to enable PowerShell scripting to run `ng` command:
```shell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
Get-ExecutionPolicy -List
```

## Installing dependencies

Add custom repo
```shell
npm config set @yourcompany:registry=https://repo.yourcompany.com/repository/npm-all

npm install @yourcompany/yourlib@3.2.1
```

Installing bootstrap etc
```shell
npm install bootstrap jquery popper.js
```

Add installed deps into the `angular.json`:
```json
"scripts": [
	"./node_modules/jquery/dist/jquery.js",
	"./node_modules/bootstrap/dist/js/bootstrap.bundle.js"
],
"styles": [
	"./node_modules/bootstrap/dist/css/bootstrap.css"
]
```
> :warning: DO NOT THAT! Instead use `scss` like below:

at `_vars.scss`

```
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';


$primary:  #123456;
$secondary: #987658;

$card-radius: 5px;

$card-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
$input-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgb(105, 147, 163);


//futhermore it's necesary override the $theme-colors

$theme-colors: (
  "primary":    $primary,
  "secondary":  $secondary,
  "success":    $success,
  "info":       $info,
  "warning":    $warning,
  "danger":     $danger,
  "light":      $light,
  "dark":       $dark
);

@import '~bootstrap/scss/bootstrap.scss';

```

Now you can use colors like:
```css
    background-color: theme-color-level("primary", -3);
    color: theme-color("secondary");
```

## Update Angular

### Globably
```shell
npm uninstall -g @angular/cli
npm cache clean
npm install -g @angular/cli@latest
```

### The project 

```shell
rm -rf node_modules dist
npm uninstall --save-dev angular-cli
npm install --save-dev @angular/cli@latest
npm install
ng update
```

