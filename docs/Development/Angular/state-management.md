# Angular State management


## Common stuff


### Main store module

`root-store.module.ts`

```TypeScript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GlobalAppStatusStoreModule } from './global-app-status/global-app-status.module';
import { CurrentUserModule } from './current-user/current-user.module';
import { environment } from 'environments/environment';
import { localStorageSyncReducer } from '@store/local-storage.meta-reducer';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { appEntityMetadata } from './entity-metadata';
import { SearchCriteriaStateModule } from './search/search-criteria/search-criteria-state.module';

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `${environment.baseUrl}/api`,
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        //default value is true
        strictStateImmutability: true,
        strictActionImmutability: true,
        //default value is false
        strictStateSerializability: true,
        strictActionSerializability: false,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({
      entityMetadata: appEntityMetadata,
    }),
    GlobalAppStatusStoreModule,
    CurrentUserModule,
    SearchCriteriaStateModule
  ],
  providers: [{ provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig }]
})
export class RootStoreModule {
}


```

### App State

`app.state.ts`

```TypeScript
import { CurrentUser } from "@store/current-user/current-user.state";
import { GlobalAppStatus } from "@store/global-app-status";
import { CurrentAccount } from "@store/account/account.state";
import { SearchCriteriaState } from "./search/search-criteria/search-criteria.state";


export interface AppState {
  globalAppStatus: GlobalAppStatus;
  currentUser: CurrentUser;
  currentAccount: CurrentAccount;
  searchCriteria: SearchCriteriaState;
}
```


### Persist state

Some of the states could be persisted into the `local storage`

`local-storage.meta-reducer.ts`

```TypeScript
import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { currentUserFeatureKey } from '@store/current-user/current-user.const';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [currentUserFeatureKey],
    rehydrate: true,
    removeOnUndefined: true
  })(reducer);
}
```

### Metadata

you my need the metadata. E.g. for `ngrx/data` based on `ngrx/entity` feature


`entity-metadata.ts`

```TypeScript

import { EntityMetadataMap } from "@ngrx/data";
import { AccountSummaryInfo } from "@pages/_models/account.model";

export const appEntityMetadata: EntityMetadataMap = {
  Account: {
    selectId: (accountSummaryInfo: AccountSummaryInfo) => accountSummaryInfo.accountId
  },
};
```

and add it into the module:
```
export class SearchCriteriaModule {
  constructor(myEntitiesService: EntityDefinitionService) {
    myEntitiesService.registerMetadataMap(MyEntityMetadata);
  }
}
```

And the service:

```
import { Injectable } from '@angular/core';
import { My } from '@app/shared/models/generic/my.model';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class MyService extends EntityCollectionServiceBase<My> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('My', serviceElementsFactory);
  }
}

```


To create the state you will need the common state defenition and for
every state you will need some separate folder with a bunch of standard files:


## Module

`search-criteria-state.module.ts`

```TypeScript

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { reducer } from './search-criteria.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchCriteriaEffects } from './search-criteria.effects';
import { searchCriteriaFeatureKey } from './search-criteria.const';



@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      StoreModule.forFeature(searchCriteriaFeatureKey, reducer),
      EffectsModule.forFeature([SearchCriteriaEffects])
    ]})
export class SearchCriteriaStateModule { }
```

## Consts [Optionally]

`search-criteria.const.ts`

```TypeScript
export const searchCriteriaFeatureKey = 'searchCriteria';

```

## State itself

`search-criteria.state.ts`

```TypeScript

import { SearchCriteria } from "@app/shared/models/search/search.model";


export interface SearchCriteriaState {
  readonly searchCriteria: SearchCriteria;
}

export const initialSearchState: SearchCriteriaState = {
  searchCriteria: { id: ''}
};

```

## Actions

`search-criteria.actions.ts`

```TypeScript
import { SearchCriteria } from "@app/shared/models/search/search.model";
import { createAction } from "@ngrx/store";
import { props } from "@ngrx/store";


export const newSearch = createAction(
  'NewSearch',
  props<{searchCriteria: SearchCriteria}>()
);

export const clearSearch = createAction(
  'ClearSearch'
);
```

## Reducer

`search-criteria.reducer.ts`

```TypeScript
import { createReducer, on } from "@ngrx/store";
import { initialSearchState } from "./search-criteria.state";
import * as SearchActions from './search-criteria.actions';


export const reducer = createReducer(
  initialSearchState,
  on(SearchActions.newSearch, (state, searchCriteria) => {
    return {
      ...searchCriteria
    }
  }),
  on(SearchActions.clearSearch, () => {
    return {
      searchCriteria: {id: ''}
    }
  })
);

```

## Effects [Optionally]

If you need to do some actions on state change you may define side effect
handlers. 


### Basic effect

```TypeScript
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { AppState } from "../app.state";
import * as SearchActions from './search.actions';
import * as GlobalAppStatusActions from "@store/global-app-status/global-app-status.actions";
import { SearchService } from "@app/shared/services/search/search.service";
import { HttpErrorResponse } from "@angular/common/http";


@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private searchService: SearchService
  ) { }


  doSearch$: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.doSearch),
      switchMap((action) => {
        this.store.dispatch(GlobalAppStatusActions.makeBusy());
        try {
          return this.searchService.doSearch(action.searchCriteria)
            .pipe(map(searchResult => SearchActions.searchResultsReady({ searchResult: searchResult })),
                  catchError(err =>
                    of(SearchActions.searchError({ errorMessage: err })))
            )
        } finally {
          this.store.dispatch(GlobalAppStatusActions.makeReady());
        }
      })
    );
  })
}

```

### Routing effect on status change

```TypeScript
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as SearchActions from './search-criteria.actions';


@Injectable()
export class SearchCriteriaEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router
  ) { }


  readonly newSearch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.newSearch),
        tap(() => this.router.navigateByUrl('/search/results'))
    ),
    { dispatch: false }
  )
}


```

### Using service and promise. 

```TypeScript
import { Injectable } from '@angular/core';
import { UserService } from '@app/shared/services/user.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { pluck, switchMap } from 'rxjs/operators';
import * as CurrentUserActions from './current-user.actions';
import * as GlobalAppStatusActions from '@store/global-app-status/global-app-status.actions'
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import * as CurrentAccountActions from "@store/account/account.actions";

@Injectable()
export class CurrentUserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService
  ) {}

  getCurrentUser$: Observable<Action> = createEffect(() => {
    console.log('getCurrentUser effect is called');
    return this.actions$.pipe(
      ofType(CurrentUserActions.getCurrentUser),
      switchMap((action) => {
        console.log(`In Effect creds: ${JSON.stringify(action)}`)
        this.store.dispatch(GlobalAppStatusActions.makeBusy());
        return this.userService
          .login(action.userCredentials)
          .toPromise()
          .then((curUser) => {
            setTimeout(() => this.router.navigate(['/dashboard']));
            if(!curUser.superAdmin && curUser.accountId) {
              this.store.dispatch(CurrentAccountActions.getCurrentAccount({accountId: curUser.accountId}));
              return CurrentUserActions.getCurrentUserSuccess({ curUser: curUser });
            }
            return CurrentUserActions.getCurrentUserFailure({error: 'This site is not accessible for users that don\'t have accountId in their user profile'});
          })
          .catch(error => {
            console.log(`We get error: ${JSON.stringify(error)}`);

            return CurrentUserActions.getCurrentUserFailure({error: error});
          })
          .finally(() => this.store.dispatch(GlobalAppStatusActions.makeReady()));
      })
    );
  });
}

```

Although using Promises is not recommended 
way. Prefer `firstValueFrom` and `lastValueFrom` operators:

```TypeScript
  public async loadCategories() {
    const categories$ = this.inventoryService.getCategories();
    this.categories = await lastValueFrom(categories$);
  }

```



## Selectors [Optionally]

selectors might be very useful to reduce the boilerplate to access
easily complicated parts of the state

`current-user.selector.ts`

```TypeScript
import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectCurrentUser = (state: AppState) => state.currentUser;

export const selectUserId = createSelector(
  selectCurrentUser,
  (userState) => userState.userId
);

export const selectUserName = createSelector(
  selectCurrentUser,
  (userState) => userState.userName
);

export const selectUserInitials = createSelector(
  selectCurrentUser,
  (userState) => `${createUserInitials(userState.firstName, userState.lastName)}`
);

export const selectToken = createSelector(
  selectCurrentUser,
  (userState) => userState.token
);

export const selectIsLoggedIn = createSelector(
  selectCurrentUser,
  (userState) => userState.token.length > 0
);

export const selectHasLoginError = createSelector(
  selectCurrentUser,
  (userState) => userState.errorMessage.length > 0
);

export const selectAuthError = createSelector(
  selectCurrentUser,
  (userState) => userState.errorMessage
);

export const selectRoles = createSelector(
  selectCurrentUser,
  (userState) => userState.roles
)

export const selectCurrentUserIsSuperAdmin = createSelector(
  selectCurrentUser,
  (userState) => userState.superAdmin
)

export const selectFormFieldPermissions = createSelector(
  selectCurrentUser,
  (userState) => userState.formFieldPermissions
)

function createUserInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}


```


## Consume the state

```TypeScript

  private destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {
    this.store.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.superAdmin = user.superAdmin;
        this.availableRoleId = user.roleId;
        this.availableRoles = user.roles;
        this.updateView();
      })
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
```
