import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from './../../environments/environment';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = `${environment.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(value) {
    return this.http.post(this.baseUrl, value).pipe(
      map((authResult) => {
        if (authResult) {
          this.setSession(authResult);
        }
      })
    );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  getAuthorizationToken = () => localStorage.getItem('id_token');
}
