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
  if (authService.isAuthenticated()) {
    return true;
  }

  return authService.refresh().pipe(
    map((response) => {
      if (response.success) {
        return true;
      }

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