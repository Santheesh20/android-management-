import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';

import { inject } from '@angular/core';

import {
  Observable,
  catchError,
  finalize,
  map,
  shareReplay,
  switchMap,
  throwError
} from 'rxjs';

import { AuthService } from '../services/auth.service';


let refreshInProgress$: Observable<string> | null = null;


function isAuthEndpoint(
  url: string,
  endpoint: string
): boolean {

  return url.endsWith(
    `/auth/${endpoint}`
  );
}


function shouldSkipAccessToken(
  url: string
): boolean {

  return (
    isAuthEndpoint(url, 'login') ||
    isAuthEndpoint(url, 'csrf') ||
    isAuthEndpoint(url, 'refresh') ||
    isAuthEndpoint(url, 'logout')
  );
}


function shouldAttachCsrfToken(
  url: string
): boolean {

  return (
    isAuthEndpoint(url, 'refresh') ||
    isAuthEndpoint(url, 'logout')
  );
}


function refreshAccessToken(
  authService: AuthService
): Observable<string> {

  if (refreshInProgress$) {

    return refreshInProgress$;
  }


  refreshInProgress$ =
    authService.refresh().pipe(

      map((response) => {

        if (
          !response.success ||
          !response.data.accessToken
        ) {

          throw new Error(
            'Access token refresh failed'
          );
        }

        return response.data.accessToken;
      }),

      catchError((error) => {

        authService.clearSession();

        return throwError(
          () => error
        );
      }),

      finalize(() => {

        refreshInProgress$ = null;
      }),

      shareReplay({
        bufferSize: 1,
        refCount: false
      })
    );


  return refreshInProgress$;
}


export const authInterceptor: HttpInterceptorFn =
  (req, next) => {

    const authService =
      inject(AuthService);


    const accessToken =
      authService.getAccessToken();


    const csrfToken =
      authService.getStoredCsrfToken();


    let request =
      req.clone({
        withCredentials: true
      });


    /*
     * Attach the access token only to
     * normal authenticated API requests.
     */
    if (
      accessToken &&
      !shouldSkipAccessToken(req.url)
    ) {

      request =
        request.clone({
          setHeaders: {
            Authorization:
              `Bearer ${accessToken}`
          }
        });
    }


    /*
     * Attach the CSRF token only to
     * state-changing authentication
     * endpoints protected by CSRF.
     */
    if (
      csrfToken &&
      shouldAttachCsrfToken(req.url)
    ) {

      request =
        request.clone({
          setHeaders: {
            'x-csrf-token':
              csrfToken
          }
        });
    }


    return next(request).pipe(

      catchError(
        (error: unknown) => {

          /*
           * Only authenticated API requests
           * should trigger automatic refresh.
           *
           * Login, CSRF, refresh and logout
           * are excluded.
           */
          if (
            !(error instanceof HttpErrorResponse) ||
            error.status !== 401 ||
            shouldSkipAccessToken(req.url)
          ) {

            return throwError(
              () => error
            );
          }


          /*
           * There is no access token to refresh.
           */
          if (
            !authService.getAccessToken()
          ) {

            return throwError(
              () => error
            );
          }


          /*
           * One refresh request is shared by
           * all simultaneous failed requests.
           */
          return refreshAccessToken(
            authService
          ).pipe(

            switchMap(
              (newAccessToken) => {

                const retryRequest =
                  req.clone({
                    withCredentials: true,

                    setHeaders: {
                      Authorization:
                        `Bearer ${newAccessToken}`
                    }
                  });


                return next(
                  retryRequest
                );
              }
            )
          );
        }
      )
    );
  };