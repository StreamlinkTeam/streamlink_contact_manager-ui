import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../entities/token.model';
import {User} from '../entities/user.model';
import {HttpClient, HttpParams} from '@angular/common/http';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";
import {HttpResponse} from '@angular/common/http';
import {Developer} from '../entities/developer.model';
import {SocietyContact} from '../entities/society-contact.model';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  authenticate(username: string, password: string): Observable<boolean> {


    this.loaderService.show();
    const url = environment.API + '/ws/users/login';

    const options = {params: new HttpParams().set('username', username).set('password', password)};

    return this.http.get<Token>(url, options)
      .map(token => {
        this.authenticateSuccess(token);
        return true;
      })
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getCurrentUser(): Observable<User> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/current';
    return this.http.get<User>(url)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {

    this.loaderService.show();
    const url = environment.API + '/ws/users/current/password';

    const options = {
      params: new HttpParams().set('oldPassword', oldPassword)
        .set('newPassword', newPassword)
    };

    return this.http.put<any>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });

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

    this.loaderService.show();
    const url = environment.API + '/ws/users/all';

    return this.http.get<User[]>(url)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getUser(reference: string): Observable<User> {

    this.loaderService.show();
    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};

    return this.http.get<User>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });

  }

  createUser(user: User): Observable<User> {
    this.loaderService.show();
    const url = environment.API + '/ws/users';
    return this.http.post<User>(url, user)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  updateUser(user: User, reference: string): Observable<User> {
    this.loaderService.show();
    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};


    return this.http
      .put<User>(url, user, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  deleteUser(reference: string) {
    this.loaderService.show();
    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

}
