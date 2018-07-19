import { AuthService } from '../shared/services/auth.service';
import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor(private router: Router,
    private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.auth.authenticated) {
      this.router.navigateByUrl('/auth');
      return false;
    }
    return true;
  }
}
