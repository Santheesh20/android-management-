import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  catchError,
  map,
  of
} from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  /*
   * Case 1:
   * Access token already exists in memory.
   *
   * The user is already authenticated.
   */
  if (authService.isAuthenticated()) {
    return true;
  }

  /*
   * Case 2:
   * Access token does not exist.
   *
   * This normally happens when:
   * - browser was refreshed
   * - Angular application restarted
   * - user opened a protected URL directly
   *
   * The refresh token is stored in the
   * HttpOnly cookie, so ask the backend
   * to create a new access token.
   */
  return authService.refresh().pipe(
    map((response) => {
      if (response.success) {
        return true;
      }

      /*
       * Refresh token is not valid anymore.
       * Clear the local authentication state.
       */
      authService.clearSession();

      return router.createUrlTree(
        ['/login'],
        {
          queryParams: {
            returnUrl: state.url
          }
        }
      );
    }),

    catchError(() => {
      /*
       * Refresh failed.
       *
       * This can happen when:
       * - refresh token expired
       * - refresh token was revoked
       * - session was logged out
       * - refresh token reuse was detected
       */
      authService.clearSession();

      return of(
        router.createUrlTree(
          ['/login'],
          {
            queryParams: {
              returnUrl: state.url
            }
          }
        )
      );
    })
  );
};