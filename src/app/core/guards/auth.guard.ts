import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(public auth: AuthService, public router: Router, public activatedRoute: ActivatedRoute) {
    }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['auth/signin']);
            return false;
        }
        return true;
    }

    isActive(): boolean {
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['/']);
            return true;
        }
        return false;
    }
}