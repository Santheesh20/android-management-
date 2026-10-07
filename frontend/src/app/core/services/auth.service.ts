import { Injectable } from '@angular/core';

import {
  Observable,
  of,
  switchMap,
  tap
} from 'rxjs';

import { ClientService } from './client.service';
import { MasterUrlService } from './master-url.service';

import {
  AuthUser,
  ChangePasswordRequest,
  ChangePasswordResponse,
  CsrfResponse,
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RefreshResponse
} from '../models/auth.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessToken: string | null = null;

  private currentUser: AuthUser | null = null;

  private csrfToken: string | null = null;


  constructor(
    private readonly client: ClientService,

    private readonly masterUrl: MasterUrlService
  ) {}


  login(
    request: LoginRequest
  ): Observable<LoginResponse> {

    return this.client.post<LoginResponse>(
      this.masterUrl.auth.login,
      request,
      {
        withCredentials: true
      }
    ).pipe(

      tap((response) => {

        if (response.success) {

          this.setSession(
            response.data.accessToken,
            response.data.user
          );
        }
      })
    );
  }


  getCsrfToken(): Observable<CsrfResponse> {

    return this.client.get<CsrfResponse>(
      this.masterUrl.auth.csrf,
      {
        withCredentials: true
      }
    ).pipe(

      tap((response) => {

        if (response.success) {

          this.csrfToken =
            response.data.csrfToken;
        }
      })
    );
  }


  ensureCsrfToken(): Observable<string> {

    if (this.csrfToken) {

      return of(
        this.csrfToken
      );
    }

    return this.getCsrfToken().pipe(

      switchMap((response) => {

        if (
          !response.success ||
          !response.data.csrfToken
        ) {

          throw new Error(
            'Unable to obtain CSRF token'
          );
        }

        return of(
          response.data.csrfToken
        );
      })
    );
  }


  getStoredCsrfToken(): string | null {

    return this.csrfToken;
  }


  refresh(): Observable<RefreshResponse> {

    return this.ensureCsrfToken().pipe(

      switchMap(() => {

        return this.client.post<RefreshResponse>(
          this.masterUrl.auth.refresh,
          {},
          {
            withCredentials: true
          }
        );
      }),

      tap((response) => {

        if (response.success) {

          this.setSession(
            response.data.accessToken,
            response.data.user
          );
        }
      })
    );
  }


  logout(): Observable<LogoutResponse> {

    return this.ensureCsrfToken().pipe(

      switchMap(() => {

        return this.client.post<LogoutResponse>(
          this.masterUrl.auth.logout,
          {},
          {
            withCredentials: true
          }
        );
      }),

      tap(() => {

        this.clearSession();
      })
    );
  }


  getMe(): Observable<MeResponse> {

    return this.client.get<MeResponse>(
      this.masterUrl.auth.me
    ).pipe(

      tap((response) => {

        if (response.success) {

          this.currentUser =
            response.data.user;
        }
      })
    );
  }


  changePassword(
    request: ChangePasswordRequest
  ): Observable<ChangePasswordResponse> {

    return this.client.post<ChangePasswordResponse>(
      this.masterUrl.auth.changePassword,
      request,
      {
        withCredentials: true
      }
    ).pipe(

      tap((response) => {

        if (response.success) {

          this.clearSession();
        }
      })
    );
  }


  getAccessToken(): string | null {

    return this.accessToken;
  }


  getCurrentUser(): AuthUser | null {

    return this.currentUser;
  }


  isAuthenticated(): boolean {

    return this.accessToken !== null;
  }


  setSession(
    accessToken: string,
    user: AuthUser
  ): void {

    this.accessToken =
      accessToken;

    this.currentUser =
      user;
  }


  clearSession(): void {

    this.accessToken = null;

    this.currentUser = null;

    this.csrfToken = null;
  }
}