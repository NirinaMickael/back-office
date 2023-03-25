import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AccountLogin, AccountLogout, UserState } from '../../schemas/users.schema';
import { MainService } from '../main.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, public service: MainService) {
  }

  login(body: AccountLogin): Observable<any> {
    return this.service._POST('/api/auth/signin', body);
  }

  logout(body: AccountLogout): Observable<any> {
    return this.service._POST('/api/auth/signout', { id: body });
  }

  refreshToken() {
    return this.service._POST('/api/auth/refreshtoken', {
      refreshToken: this.getRefreshToken()
    }).pipe(
      tap(response => {
        this.storeTokens(response.accessToken);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    // Check whether the refresh token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh-token');
  }

  storeTokens(access: string) {
    localStorage.setItem('access-token', access);
  }

  clearTokens() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');
  }

  forgotPassword(body: any): Observable<any> {
    return this.service._POST('/api/auth/forgotpassword', body);
  }

  resetPassword(resetToken: any, body: any): Observable<any> {
    return this.service._PUT('/api/auth/resetpassword', resetToken, body);
  }

  getNewAccessToken(): Observable<any> {
    return this.service._POST('/api/auth/newAccessToken', {});
  }
}