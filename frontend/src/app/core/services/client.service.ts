import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private readonly http: HttpClient
  ) {}

  get<T>(
    url: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.get<T>(
      url,
      options
    );
  }

  post<T>(
    url: string,
    body: unknown,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.post<T>(
      url,
      body,
      options
    );
  }

  put<T>(
    url: string,
    body: unknown,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.put<T>(
      url,
      body,
      options
    );
  }

  patch<T>(
    url: string,
    body: unknown,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.patch<T>(
      url,
      body,
      options
    );
  }

  delete<T>(
    url: string,
    options?: {
      headers?: HttpHeaders;
      params?: HttpParams;
      withCredentials?: boolean;
    }
  ): Observable<T> {
    return this.http.delete<T>(
      url,
      options
    );
  }
}