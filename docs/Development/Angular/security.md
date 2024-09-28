# Angular Security

## Guards


### Auth guard


`shared/guards/auth.guard.ts`


```TypeScript
import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '@store/app.state';
import {selectIsLoggedIn} from '@store/current-user/current-user.selector';
import {mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly store: Store<AppState>,
    private readonly router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectIsLoggedIn).pipe(
      mergeMap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
        }
        return of(isLoggedIn);
      })
    );
  }

}

```


Here is the unit test for that:

```TypeScript
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockUserContextService } from '@app/test/mock-usercontext.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AppState } from '@store/app.state';
import { initialGlobalAppStatus } from '@store/global-app-status';
import { CurrentUser } from '@store/current-user/current-user.state';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let store: MockStore<AppState>;
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;

  const appServiceMock: MockUserContextService = new MockUserContextService();

  function setupTestingModuleWithCurrentUserInState(currentUser: CurrentUser): void {
    const initialState: AppState = {
      globalAppStatus: initialGlobalAppStatus,
      currentUser,
      currentAccount: appServiceMock.getCurrentAccount()
    };
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
      ],
      providers: [
        AuthGuard,
        provideMockStore({ initialState }),
        { provide: Router, useValue: jasmine.createSpyObj('router', ['navigate']) },
        {
          provide: ActivatedRouteSnapshot,
          useValue: jasmine
            .createSpyObj([
              'root',
              'parent',
              'firstChild',
              'children',
              'pathFromRoot',
              'paramMap',
              'queryParamMap',
              'toString'
            ])
        },
        {
          provide: RouterStateSnapshot,
          useValue: jasmine
            .createSpyObj([
              'toString'
            ])
        }
        // other providers
      ],
    });
    guard = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRouteSnapshot);
    state = TestBed.inject(RouterStateSnapshot);
  }

  it('should be created', () => {
    const currentUser = appServiceMock.getUserWithoutToken();
    setupTestingModuleWithCurrentUserInState(currentUser);
    expect(guard).toBeTruthy();
  });

  it('should return false if the current-user state is NOT logged in', () => {
    //const expected = cold('(a|)', { a: false });
    const currentUser = appServiceMock.getUserWithoutToken();
    setupTestingModuleWithCurrentUserInState(currentUser);
    guard.canActivate(route, state)
      .subscribe(data => {
        expect(data).toBeFalsy();
      });
  });

  it('should return true if the current-user state is logged in', () => {
    //const expected = cold('(a|)', { a: true });
    const currentUser = appServiceMock.getUserWithToken();
    setupTestingModuleWithCurrentUserInState(currentUser);
    guard.canActivate(route, state)
      .subscribe(data => {
        expect(data).toBeTruthy();
      });
  });
});

```

Session management:

```TypeScript

@Injectable({
  providedIn: 'root'
})
export class AuthSessionService {

  readonly isLoggedIn$: Observable<boolean>;

  private userInfoRequestSent = false;

  constructor(
    private readonly tokenLocalStorageService: TokenLocalStorageService,
    private readonly store: Store<AppState>,
  ) {
    this.isLoggedIn$ = this.tokenLocalStorageService.token$.pipe(map(token => !!token));
  }

  subscribeOnLoggedInChange(): void {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn && !this.userInfoRequestSent) {
        this.userInfoRequestSent = true;
        this.store.dispatch(getCurrentUser());
      }
      if (!isLoggedIn) {
        this.userInfoRequestSent = false;
      }
    })
  }
}

```


Get  current user info from the backend:

```TypeScript
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly httpClient: HttpClient) {
  }

  getCurrentUser(): Observable<AuthenticatedUser> {
    return this.httpClient.get<AuthenticatedUser>(`${environment.baseUrl}/api/user/profile`);
  }
  
}

```


Smaple Login screen

```html

 <form
        [formGroup]="loginForm"
        (ngSubmit)="logIn()"
        autocomplete="off"
        novalidate>
        <div class="row no-gutters pl-3">
          <div class="order-last order-md-first col-sm-12 col-md-5 d-flex flex-column">
            <div class="form-group">
              <label class="text-white" for="userNameText">User Name</label>
              <input formControlName="userName" type="text"
                     id="userNameText"
                     class="form-control login-input-icon"
                     placeholder="User Name"
                     autocomplete="off"
                     [maxLength]="validationRules.usernameMaxLength">
            </div>
            <div class="form-group">
              <label class="text-white d-flex" for="passwordText">Password
                <a routerLink="/forgot-password" class="text-white font-light ml-auto" tabindex="999">Forgot Your
                  Password?</a>
              </label>
              <input formControlName="password" type="password"
                     id="passwordText"
                     class="form-control login-input-icon"
                     placeholder="Password"
                     autocomplete="off">
            </div>

            <div role="alert" class="alert alert-danger" *ngIf="loginErrorMessage$ | async">
              Your <b>Username</b> and/or <b>Password</b> do not match our records.
              Error: {{loginErrorMessage$ | async}}
            </div>

            <button class="btn btn-primary btn-block my-4 text-uppercase" [disabled]="loginForm.invalid">Sign In
            </button>

          </div>
        </div>
      </form>

```

login.component.ts

```TypeScript

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  readonly validationRules = VALIDATION_RULES;

  usernameControl?: FormControl;
  passwordControl?: FormControl;
  
    loginForm = this.fb.group({
    userName: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  loginErrorMessage$?: Observable<string>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store<AppState>,
  ) {
  }
  
  ngOnInit() {
    this.createForm();
    this.loginErrorMessage$ = this.store.pipe(select(selectAuthError));
  }

  logIn(): void {
    if (this.loginForm!.valid) {
      this.store.dispatch(CurrentUserActions.logIn({
        credentials: {
          ...this.loginForm.value
        }
      }));
    }
  }

  private createForm(): void {
    this.usernameControl = this.loginForm.get('userName') as FormControl;
    this.passwordControl = this.loginForm.get('password') as FormControl;
  }

}
```