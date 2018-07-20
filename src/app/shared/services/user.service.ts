import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../entities/token.model';
import {User} from '../entities/user.model';
import {HttpResponse, HttpHeaders} from '@angular/common/http';
import {HttpClient, HttpParams} from '@angular/common/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<boolean> {


    const url = environment.API + '/ws/users/login';

    const options = {params: new HttpParams().set('username', username).set('password', password)};

    return this.http.get<Token>(url, options)
      .map(token => {
        this.authenticateSuccess(token);
        return true;
      })
      .catch(this.handleError);
  }

  getCurrentUser(): Observable<User> {
    let url = environment.API + '/ws/users/current';
    return this.http.get(url).map((res: HttpResponse<User>) => res.body);
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
      .get(url)
      .map((res: HttpResponse<User[]>) => res.body)
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
