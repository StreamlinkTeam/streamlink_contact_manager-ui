import {User} from '../entities/user.model';
import {UserService} from './user.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';


import 'rxjs/add/operator/map';
import {JwtToken} from '../entities/token.model';

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

    if (!this.tokenNotExpired()) {
      this.clear();
      return false;
    }

    return true;

  }


  public isAdmin(): boolean {
    return this.isAuthenticated() && this.roleMatch(['ROLE_ADMIN']);
  }


  roleMatch(allowedRoles: string[]): boolean {
    var isMatch = false;
    var userRoles: string[] = this.getJwtToken().auth;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;

  }


  clear() {
    this.userService.logout();
  }

  private tokenNotExpired(): boolean {

    let decodedJwtData = this.getJwtToken();

    // console.log('decodedJwtData: ' + decodedJwtData);
    // console.log('exp: ' + decodedJwtData.exp.valueOf());

    return !(decodedJwtData.exp.valueOf() > (new Date().valueOf()));
  }

  private getJwtToken(): JwtToken {
    let decodedJwtJsonData = window.atob(this.getToken().split('.')[1]);
    let decodedJwtData = JSON.parse(decodedJwtJsonData) as JwtToken;
    return decodedJwtData;
  }

}
