# Setting up and Managing Angular Project

## Setup a new app

- create new folder for Spring Boot app and create `frontend` angular app with navigation and scss styles:

```shell
ng new frontend
```
- put cl favicon into `src`

- change `angular.json` prefix. E.g. `my`

- create `.npmrc` in the project root and add Artifactory repo2

```
@company:registry=http://artifactory.company.com/artifactory/api/npm/cmp-npm-release-libs-virtual/
```

- go to artifactory and create the creds than add it into the user(!) folder  `.npmrc`:

```
_auth = byBase64secret
email = my@email.com
always-auth = true

```

- add required deps:

```shell

npm install bootstrap jquery
npm install popper.js@1.16.1

npm config set @company:registry=https://repo.company.com/repository/npm-all
npm install ag-grid-community
npm install ag-grid-angular
```

and register it in the `angular.json` under `architect` section. Be careful on that, there are other sections like `test`

```json
            "styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.scss"
            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.bundle.js",
            ]
```

- rename app tags using your prefix. e.g. `index.html` and `app.component.ts` etc

- create the folder `assets/images` and put logo image and other images.

- add into app.module:


- add

```shell
ng add @ng-bootstrap/ng-bootstrap
```

## Creating components

- For root pages or other big parts we need a module and than add the components into that module:

```shell
ng g module new-module
ng g component new-module/new-module-page
```

- Add new module into the app module in the import section

-for page components specific to this page only we will use nested folder `components`. Same for services.

### Other command samples
```shell

ng g module subpage/new-module
ng g component subpage/new-module/new-module-page
ng g c pages/account-setup/as-settings/migrate-data/templates --skip-import 
ng g c shared/components/widgets/collapsable-info-panel
ng g a store/global-app-status -c true --skip-tests true
ng g r store/global-app-status/global-app-status -c true --skip-tests true 

```

## Using Reactive Forms

We must not mix service/data layer with presentation layer. The domain classes/interfaces has own topology with reused components which require 
different validators at the different places. So beeter use formGroup model for UI and map it with domain objects. Consider Object.assign for that or spread operator etc.

- we need 3rd party lib to add `Decorator based model` so we can share the domain objects with UI and service 
layer reducing the boilerplate by validation annotations on domain classes

```shell
npm i @rxweb/reactive-form-validators
```



## Use path aliases:

In the `tsconfig.json`

```TypeScript
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "src",
    "paths": {
      "@app/*": ["app/*"],
      "@components/*": ["app/shared/components/*"],
      "@pages/*": ["app/pages/*"]
    },
```

## Global css vars

In the `angular.json`. Make sure you have added into the both sections including the test one.

```JavaScript
"scripts": [
              "./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"
            ],
            "stylePreprocessorOptions": {
              "includePaths": [
                "./src/assets",
                "./src/scss"
              ]
            },
```

## Environment

Add develop and prod envs. Prod env should be empty to use backed api base url.

```TypeScript
export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080'
};
```

## Theming and globals

First off, open angular.json
You may use direct references onto the css files. Mostly some libs etc

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "cli": {
    "analytics": false,
    "defaultCollection": "@ngrx/schematics"
  },
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "frontend": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss"
        },
        "@schematics/angular:application": {
          "strict": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "ldc",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/frontend",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "./node_modules/bootstrap/dist/css/bootstrap.css",
              "./src/styles.scss"
            ],
            "scripts": [
              "./node_modules/jquery/dist/jquery.js",
              "./node_modules/bootstrap/dist/js/bootstrap.bundle.js"
            ],
            "stylePreprocessorOptions": {
              "includePaths": [
                "./src/assets",
                "./src/scss"
              ]
            },
            "allowedCommonJsDependencies": [
              "chart.js"
            ]
          },

```

Make sure the same also is available for test section below.

Now you may have some common stuff under the `scss` roo folder:

`_vars.scss`

```css

@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';


$color-black: rgb(0, 0, 0); 

$color-red: #e70801;
$color-red-dark: #b1132c;
$color-blue: #2573b8;

$color-success: rgb(67, 131, 67); 
$color-warning: rgb(222, 178, 18); 
$color-info: rgb(42, 92, 173); 
$color-danger: rgb(172, 62, 75); 
$color-drop: rgb(214, 237, 245); 

$color-border-separator: rgb(90, 100, 16); 


$box-shadow-material: -2px 0 8px 0 rgba($color-black, 0.15);
$box-shadow-material-light: 0 4px 5px 0 rgba(0,0,0,.15);
$box-shadow-light: -1px 0 4px 0 rgba($color-black, 0.11);

$transition: all .5s ease;

$font-family-book: "opensans-semibold", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
$font-family-light: "opensans-light", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";


$color-my-green: $color-success;

$border-separator: 1px solid $color-border-separator;
$border-transparent: 1px solid transparent;

$fa-solid: 'fa-solid';

$header-height: 48px;

$font-size-xxs: 10px;
$font-size-xs: 12px;
$font-size-s: 14px;
$font-size-m: 16px;
$font-size-l: 18px;
$font-size-xl: 20px;
$font-size-xxl: 28px;
$font-size-xxxl: 32px;

$space-xxs: 2px;
$space-xs: 4px;
$space-6: 6px;
$space-s: 8px;
$space-12: 12px;
$space-14: 14px;
$space-m: 16px;
$space-20: 20px;
$space-l: 24px;
$space-26: 26px;
$space-xl: 32px;
$space-mxl: 40px;
$space-xxl: 48px;
$space-xxxl: 64px;
$space-xxxxl: 94px;

```

`_global.scss`:

```css

@import 'vars';

html,
body {
  width: 100%;
  height: 100%;
}

body {
  overscroll-behavior: contain;
  margin: 0;
}

.bigred, .red-icon {
  color: $color-red-dark;
}


```
