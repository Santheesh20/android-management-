import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterUrlService {

  private readonly apiBaseUrl =
    environment.apiBaseUrl;

  readonly auth = {
    login:
      `${this.apiBaseUrl}/api/v1/auth/login`,

    csrf:
      `${this.apiBaseUrl}/api/v1/auth/csrf`,

    refresh:
      `${this.apiBaseUrl}/api/v1/auth/refresh`,

    logout:
      `${this.apiBaseUrl}/api/v1/auth/logout`,

    me:
      `${this.apiBaseUrl}/api/v1/auth/me`,

    changePassword:
      `${this.apiBaseUrl}/api/v1/auth/change-password`
  };
}