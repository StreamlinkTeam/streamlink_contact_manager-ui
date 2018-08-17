import {User} from '../entities/user.model';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {tokenNotExpired} from 'angular2-jwt';


import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) {
  }

  authenticate(username: string, password: string): Observable<boolean> {
    return this.userService.authenticate(username, password);
  }

  getCurrentUser(): User {
    let user: User;

    this.userService.getCurrentUser().subscribe(response => user = response);
    return user;

  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();

    // return a boolean reflecting
    // whether or not the token is expired
    if (token == null || token === 'undefined') {
      return false;
    }

    return tokenNotExpired('access_token');

  }


  clear() {
    this.userService.logout();
  }

}
