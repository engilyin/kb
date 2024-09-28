# Angular Routing

## Sample routes

```TypeScript
const routes: Routes = [
  // App routes goes here
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/dashboard'
      },
      {
        path: 'dashboard',
        component: AdminHomePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'account-setup',
        loadChildren: () => import('@pages/account-setup/account-setup.module').then((m) => m.AccountSetupModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'account-setup/:id',
        loadChildren: () => import('@pages/account-setup/account-setup.module').then((m) => m.AccountSetupModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'summary',
        component: SummaryPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reports',
        component: ReportsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'email-settings',
        component: EmailSettingsPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'search',
        loadChildren: () => import('@pages/search/search.module').then((m) => m.SearchModule),
        canActivate: [AuthGuard],
      }
    ]
  },

  //no layout routes
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
```

```TypeScript
const routes: Routes = [
  // App routes goes here
  {
    path: '',
    pathMatch: 'full',
    redirectTo: DEFAULT_ROOT_REDIRECT
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: AppRoutes.SetUser,
        component: SetUserPageComponent,
        resolve: {
          userInfo: UserInfoResolver
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: '',
        component: AppLayoutComponent,
        canActivate: [RegularUserGuard, ActionNotRequiredGuard],
        children: [
          {
            path: AppRoutes.Dashboard,
            component: DashboardComponent,
          },
          {
            path: AppRoutes.Search,
            loadChildren: () => import('@pages/search/search.module').then((m) => m.SearchModule),
          },
          {
            path: AppRoutes.OtherStuff,
            loadChildren: () => import('@pages/account-setup/aother-stuff.module').then((m) => m.OtherStuffModule),
          },
          {
            path: AppRoutes.SpecialSettings,
            loadChildren: () => import('@pages/email-settings/special-settings.module').then((m) => m.SpecialSettingsModule),
            canActivate: [AuthorityGuard],
            data: {
              requiredAuthority: {
                capability: CapabilityType.DO_SPECIAL_THINGS,
                permissions: [PermissionType.VIEW, PermissionType.UPDATE],
              }
            } as AppRouteData
          },
          {
            path: AppRoutes.Refresh,
            component: BlankComponent,
            children: [
              {
                path: '**',
                component: BlankComponent,
              }
            ]
          },
        ],
      },
      {
        path: '',
        component: AppLayoutComponent,
        canActivate: [SuperAdminGuard, ActionNotRequiredGuard],
        children: [
          {
            path: AppRoutes.SuperAdmin,
            loadChildren: () => import('@pages/super-admin/super-admin.module').then((m) => m.SuperAdminModule),
          }
        ]
      }
    ]
  },
  //no layout routes
  {
    path: AppRoutes.Login,
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: AppRoutes.ForgotPassword,
    component: ForgotPasswordPageComponent,
    canActivate: [GuestGuard]
  },
  {
    path: AppRoutes.ResetPassword,
    component: ResetPasswordPageComponent,
    canActivate: [GuestGuard],
    resolve: {
      passwordTokenInfo: ResetPasswordTokenInfoResolver
    },
    runGuardsAndResolvers: 'always'
  },
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
```


Sample resolver:
```TypeScript

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordTokenInfoResolver implements Resolve<ResetPasswordTokenInfo> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResetPasswordTokenInfo> {
    return this.userService.getResetPasswordTokenInfo(
      route.queryParams[ForgotPasswordQueryParams.USER_ID],
      route.queryParams[ForgotPasswordQueryParams.RESET_PASSWORD_TOKEN]
    );
  }
}
```

`_mixings.scss`


```css
import 'vars';
@import '~bootstrap/scss/mixins/breakpoints';

//IE10+
@mixin ieBrowser {
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    @content;
  }
}

@mixin mobile {
  @include media-breakpoint-down(sm) {
    @content
  }
}

@mixin tablet {
  @include media-breakpoint-between(md, md) {
    @content
  }
}

@mixin height-1000-break {
  @media (max-height: 1000px) {
    @content
  }
}

@mixin tablet-and-height-1000-break {
  @include tablet { @content };
  @include height-1000-break { @content };
}

@mixin text-truncate() {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@mixin scroll-y {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
}

@mixin scroll-x {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}
```


Now you may use it at the global project css so it will be included 
everywhere `styles.scss`:

```css
@import 'scss/vars';
@import 'scss/mixins';
@import 'scss/global';

```


### Additional tuning
To get all params from the route you need to add additional config

```
export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routingConfiguration)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

## Adding the route module for the modules

Just create manually the file `module-name`-`router.module.ts` in the same folder where the module `ts` exists.

```TypeScript
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MyComponent } from './_root/my.component';
import { AnotherComponent } from './another/_root/another.component';


const routes: Routes = [
    {
      path: '',
      component: MyComponent,
      children: [
        {
          path: '',
          redirectTo: 'another',
          pathMatch: 'exact'
        },
        {
          path: 'another',
          loadChildren: () => import('@pages/another/another.module').then((m) => m.AnotherModule),
        },
        {
          path: 'simple',
          component: SimpleComponent
        }
      ]
    }
  ];

  @NgModule({
    imports: [ 
      RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
  })
  export class MyRouterModule { }
```