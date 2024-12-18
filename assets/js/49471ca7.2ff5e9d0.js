"use strict";(self.webpackChunkalex_ilin_kb=self.webpackChunkalex_ilin_kb||[]).push([[9197],{8035:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>u,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>l});const o=JSON.parse('{"id":"Development/Angular/routing","title":"Angular Routing","description":"Sample routes","source":"@site/docs/Development/Angular/routing.md","sourceDirName":"Development/Angular","slug":"/Development/Angular/routing","permalink":"/kb/Development/Angular/routing","draft":false,"unlisted":false,"editUrl":"https://github.com/engilyin/kb/docs/Development/Angular/routing.md","tags":[],"version":"current","lastUpdatedAt":1727544268000,"frontMatter":{},"sidebar":"defaultSidebar","previous":{"title":"Reactive forms","permalink":"/kb/Development/Angular/reactive-forms"},"next":{"title":"Angular Security","permalink":"/kb/Development/Angular/security"}}');var r=t(4848),a=t(8453);const s={},i="Angular Routing",u={},l=[{value:"Sample routes",id:"sample-routes",level:2},{value:"Additional tuning",id:"additional-tuning",level:3},{value:"Adding the route module for the modules",id:"adding-the-route-module-for-the-modules",level:2}];function p(n){const e={code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",p:"p",pre:"pre",...(0,a.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"angular-routing",children:"Angular Routing"})}),"\n",(0,r.jsx)(e.h2,{id:"sample-routes",children:"Sample routes"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-TypeScript",children:"const routes: Routes = [\n  // App routes goes here\n  {\n    path: '',\n    component: AppLayoutComponent,\n    children: [\n      {\n        path: '',\n        pathMatch: 'full',\n        redirectTo: '/dashboard'\n      },\n      {\n        path: 'dashboard',\n        component: AdminHomePageComponent,\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'account-setup',\n        loadChildren: () => import('@pages/account-setup/account-setup.module').then((m) => m.AccountSetupModule),\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'account-setup/:id',\n        loadChildren: () => import('@pages/account-setup/account-setup.module').then((m) => m.AccountSetupModule),\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'summary',\n        component: SummaryPageComponent,\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'reports',\n        component: ReportsPageComponent,\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'email-settings',\n        component: EmailSettingsPageComponent,\n        canActivate: [AuthGuard],\n      },\n      {\n        path: 'search',\n        loadChildren: () => import('@pages/search/search.module').then((m) => m.SearchModule),\n        canActivate: [AuthGuard],\n      }\n    ]\n  },\n\n  //no layout routes\n  { path: 'login', component: LoginComponent, canActivate: [GuestGuard]},\n  // otherwise redirect to home\n  { path: '**', redirectTo: '' }\n];\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-TypeScript",children:"const routes: Routes = [\n  // App routes goes here\n  {\n    path: '',\n    pathMatch: 'full',\n    redirectTo: DEFAULT_ROOT_REDIRECT\n  },\n  {\n    path: '',\n    canActivate: [AuthGuard],\n    children: [\n      {\n        path: AppRoutes.SetUser,\n        component: SetUserPageComponent,\n        resolve: {\n          userInfo: UserInfoResolver\n        },\n        runGuardsAndResolvers: 'always'\n      },\n      {\n        path: '',\n        component: AppLayoutComponent,\n        canActivate: [RegularUserGuard, ActionNotRequiredGuard],\n        children: [\n          {\n            path: AppRoutes.Dashboard,\n            component: DashboardComponent,\n          },\n          {\n            path: AppRoutes.Search,\n            loadChildren: () => import('@pages/search/search.module').then((m) => m.SearchModule),\n          },\n          {\n            path: AppRoutes.OtherStuff,\n            loadChildren: () => import('@pages/account-setup/aother-stuff.module').then((m) => m.OtherStuffModule),\n          },\n          {\n            path: AppRoutes.SpecialSettings,\n            loadChildren: () => import('@pages/email-settings/special-settings.module').then((m) => m.SpecialSettingsModule),\n            canActivate: [AuthorityGuard],\n            data: {\n              requiredAuthority: {\n                capability: CapabilityType.DO_SPECIAL_THINGS,\n                permissions: [PermissionType.VIEW, PermissionType.UPDATE],\n              }\n            } as AppRouteData\n          },\n          {\n            path: AppRoutes.Refresh,\n            component: BlankComponent,\n            children: [\n              {\n                path: '**',\n                component: BlankComponent,\n              }\n            ]\n          },\n        ],\n      },\n      {\n        path: '',\n        component: AppLayoutComponent,\n        canActivate: [SuperAdminGuard, ActionNotRequiredGuard],\n        children: [\n          {\n            path: AppRoutes.SuperAdmin,\n            loadChildren: () => import('@pages/super-admin/super-admin.module').then((m) => m.SuperAdminModule),\n          }\n        ]\n      }\n    ]\n  },\n  //no layout routes\n  {\n    path: AppRoutes.Login,\n    component: LoginComponent,\n    canActivate: [GuestGuard]\n  },\n  {\n    path: AppRoutes.ForgotPassword,\n    component: ForgotPasswordPageComponent,\n    canActivate: [GuestGuard]\n  },\n  {\n    path: AppRoutes.ResetPassword,\n    component: ResetPasswordPageComponent,\n    canActivate: [GuestGuard],\n    resolve: {\n      passwordTokenInfo: ResetPasswordTokenInfoResolver\n    },\n    runGuardsAndResolvers: 'always'\n  },\n  // otherwise redirect to home\n  {path: '**', redirectTo: ''}\n];\n\nexport const routingConfiguration: ExtraOptions = {\n  paramsInheritanceStrategy: 'always'\n};\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes, routingConfiguration)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule {\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"Sample resolver:"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-TypeScript",children:"\n@Injectable({\n  providedIn: 'root'\n})\nexport class ResetPasswordTokenInfoResolver implements Resolve<ResetPasswordTokenInfo> {\n\n  constructor(private userService: UserService) {\n  }\n\n  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResetPasswordTokenInfo> {\n    return this.userService.getResetPasswordTokenInfo(\n      route.queryParams[ForgotPasswordQueryParams.USER_ID],\n      route.queryParams[ForgotPasswordQueryParams.RESET_PASSWORD_TOKEN]\n    );\n  }\n}\n"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.code,{children:"_mixings.scss"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-css",children:"import 'vars';\n@import '~bootstrap/scss/mixins/breakpoints';\n\n//IE10+\n@mixin ieBrowser {\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    @content;\n  }\n}\n\n@mixin mobile {\n  @include media-breakpoint-down(sm) {\n    @content\n  }\n}\n\n@mixin tablet {\n  @include media-breakpoint-between(md, md) {\n    @content\n  }\n}\n\n@mixin height-1000-break {\n  @media (max-height: 1000px) {\n    @content\n  }\n}\n\n@mixin tablet-and-height-1000-break {\n  @include tablet { @content };\n  @include height-1000-break { @content };\n}\n\n@mixin text-truncate() {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n@mixin scroll-y {\n    overflow-y: auto;\n    -webkit-overflow-scrolling: touch;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n}\n\n@mixin scroll-x {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n}\n"})}),"\n",(0,r.jsxs)(e.p,{children:["Now you may use it at the global project css so it will be included\neverywhere ",(0,r.jsx)(e.code,{children:"styles.scss"}),":"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-css",children:"@import 'scss/vars';\n@import 'scss/mixins';\n@import 'scss/global';\n\n"})}),"\n",(0,r.jsx)(e.h3,{id:"additional-tuning",children:"Additional tuning"}),"\n",(0,r.jsx)(e.p,{children:"To get all params from the route you need to add additional config"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"export const routingConfiguration: ExtraOptions = {\n  paramsInheritanceStrategy: 'always'\n};\n\n@NgModule({\n  imports: [RouterModule.forRoot(routes, routingConfiguration)],\n  exports: [RouterModule]\n})\nexport class AppRoutingModule { }\n\n"})}),"\n",(0,r.jsx)(e.h2,{id:"adding-the-route-module-for-the-modules",children:"Adding the route module for the modules"}),"\n",(0,r.jsxs)(e.p,{children:["Just create manually the file ",(0,r.jsx)(e.code,{children:"module-name"}),"-",(0,r.jsx)(e.code,{children:"router.module.ts"})," in the same folder where the module ",(0,r.jsx)(e.code,{children:"ts"})," exists."]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-TypeScript",children:"import { Routes, RouterModule } from '@angular/router';\nimport { NgModule } from '@angular/core';\nimport { MyComponent } from './_root/my.component';\nimport { AnotherComponent } from './another/_root/another.component';\n\n\nconst routes: Routes = [\n    {\n      path: '',\n      component: MyComponent,\n      children: [\n        {\n          path: '',\n          redirectTo: 'another',\n          pathMatch: 'exact'\n        },\n        {\n          path: 'another',\n          loadChildren: () => import('@pages/another/another.module').then((m) => m.AnotherModule),\n        },\n        {\n          path: 'simple',\n          component: SimpleComponent\n        }\n      ]\n    }\n  ];\n\n  @NgModule({\n    imports: [ \n      RouterModule.forChild(routes) ],\n    exports: [ RouterModule ]\n  })\n  export class MyRouterModule { }\n"})})]})}function c(n={}){const{wrapper:e}={...(0,a.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(p,{...n})}):p(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>s,x:()=>i});var o=t(6540);const r={},a=o.createContext(r);function s(n){const e=o.useContext(a);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:s(n.components),o.createElement(a.Provider,{value:e},n.children)}}}]);