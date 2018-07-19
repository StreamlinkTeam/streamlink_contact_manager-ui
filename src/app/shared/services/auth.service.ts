import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {}

  authenticate(username: string, password: string): Observable<boolean> {
    return this.userService.authenticate(username, password);
  }

  get authenticated(): boolean {
    return localStorage.getItem('access_token')
      != null;
  }

  clear() {
    this.userService.logout();
  }

}
