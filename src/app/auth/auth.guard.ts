import {AuthService} from '../shared/services/auth.service';
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  Router, CanDeactivate
} from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor(private router: Router,
    private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }

}

@Injectable()
export class LoginGuard {

  constructor(private router: Router,
    private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/developers');
      return false;
    }
    return true;
  }

}
