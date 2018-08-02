import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../entities/token.model';
import {User} from '../entities/user.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  authenticate(username: string, password: string): Observable<boolean> {


    const url = environment.API + '/ws/users/login';

    const options = {params: new HttpParams().set('username', username).set('password', password)};

    return this.http.get<Token>(url, options)
      .map(token => {
        this.authenticateSuccess(token);
        return true;
      });
  }

  getCurrentUser(): Observable<User> {
    let url = environment.API + '/ws/users/current';
    return this.http.get<User>(url).catch(this.handleError);
  }

  logout(): boolean {
    localStorage.removeItem('access_token');
    return true;
  }

  authenticateSuccess(token: Token): Token {

    localStorage.setItem('access_token', token.access_token);
    return token;
  }

  getUsers(): Observable<User[]> {

    const url = environment.API + '/ws/users';

    return this
      .http
      .get<User[]>(url)
      .catch(this.handleError);
  }

  /**
   * Handle server errors.
   * @param error .
   */
  private handleError(error: HttpResponse<any> | any) {


    console.error(error);
    return Promise.reject(error);
  }

}
