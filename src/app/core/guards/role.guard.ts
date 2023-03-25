import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log("role guard hitted...")
    // this will be passed from the route config
    // on the data property
    let chatAuth = route?.data?.canChat;

    const expectedRole = route.data.role;
    const token = localStorage.getItem('access-token');
    // decode the token to get its payload
    const tokenPayload: any = token && decode(token);

    if (token && !expectedRole.includes(tokenPayload.role)) {
      console.log("payload => ",tokenPayload.role)
      console.log("expectRole =>",expectedRole)
      this.router.navigate(['auth/signin']);
      return false;
    }

    // check if admin can chat
    if (token && expectedRole.includes(tokenPayload.role) && chatAuth) {
      if (!tokenPayload.canChat) {
        this.router.navigate(['auth/signin']);
        return false;
      }
    }

    return true;
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }
}
