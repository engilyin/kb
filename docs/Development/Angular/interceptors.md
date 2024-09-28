# Interceptors

## Inject JWT token interceptor `auth.interceptor.ts`

```TypeScript
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '@app/store/app.state';
import { selectToken } from '@app/store/current-user/current-user.selector';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly store: Store<AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectToken).pipe(
      first(),
      mergeMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        });
        const authReq = !!token ? req.clone({ headers }) : req;
        return next.handle(authReq);
      }),
    );
  }
}
```


Altrnative:

```TypeScript
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  public static readonly CONTENT_TYPE_HEADER: string = 'Content-Type';
  public static readonly CONTENT_TYPE_VALUE: string = 'application/json';

  public static readonly AUTHORIZATION_HEADER: string = 'Authorization';
  public static readonly AUTHORIZATION_VALUE_PREFIX: string = 'Bearer ';

  constructor(
    private readonly tokenLocalStorageService: TokenLocalStorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.tokenLocalStorageService.token$.pipe(
      first(),
      mergeMap(token => {
        const authorizationHeaderValue = `${ AuthInterceptor.AUTHORIZATION_VALUE_PREFIX }${ token }`;
        let headers = new HttpHeaders({
          [AuthInterceptor.AUTHORIZATION_HEADER]: authorizationHeaderValue
        });
        if (!req.headers || !req.headers.has(AuthInterceptor.CONTENT_TYPE_HEADER)) {
          headers = headers.append(AuthInterceptor.CONTENT_TYPE_HEADER, AuthInterceptor.CONTENT_TYPE_VALUE);
        }
        const authReq = !!token ? req.clone({ headers }) : req;
        return next.handle(authReq);
      }),
    );
  }
}
```


```TypeScript
@Injectable({
  providedIn: 'root'
})
export class RefreshedSessionTokenInterceptor implements HttpInterceptor {

  private static readonly REFRESHED_SESSION_TOKEN_HEADER = 'Refreshed-Session-Token';

  constructor(private readonly tokenLocalStorageService: TokenLocalStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(response => {
        const httpResponse = response as HttpResponse<any>;
        const refreshedToken = httpResponse.headers?.get(
          RefreshedSessionTokenInterceptor.REFRESHED_SESSION_TOKEN_HEADER
        );
        const requestToken = this.getTokenFromRequest(request);

        if (refreshedToken && this.tokenLocalStorageService.getToken() === requestToken) {
          this.tokenLocalStorageService.setToken(refreshedToken);
        }
      })
    );
  }

  getTokenFromRequest(request: HttpRequest<any>): string | undefined {
    const authorizationHeader = request.headers?.get(AuthInterceptor.AUTHORIZATION_HEADER);

    return authorizationHeader && authorizationHeader.startsWith(AuthInterceptor.AUTHORIZATION_VALUE_PREFIX)
      ? authorizationHeader.substr(AuthInterceptor.AUTHORIZATION_VALUE_PREFIX.length)
      : undefined;
  }
}
```

## Error interceptor

```TypeScript
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import * as CurrentUserActions from "@store/current-user/current-user.actions";
import { Store } from "@ngrx/store";
import { AppState } from "@store/app.state";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router,
              private readonly store: Store<AppState>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {

          if (error.status === 401 || error.status === 403) {
            this.store.dispatch(
              CurrentUserActions.logOut()
            );
            this.router.navigate(['/login']);
          }
          return throwError(error.message);
        })
      )
  }
}
```