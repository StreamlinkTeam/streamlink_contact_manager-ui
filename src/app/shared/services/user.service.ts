import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Action} from '../entities/action.model';
import {User} from '../entities/user.model';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  authenticate(username: string, password: string): Observable<string> {
    let options = new RequestOptions();
    let params = new URLSearchParams();
    params.set('username', username);
    params.set('password', password);
    options.search = params;
    let url = environment.API + '/ws/users/login';

    return this.http.
      get(url, options)
      .map((res: Response) => {
        return this.authenticateSuccess(res.json());
      })
      .catch(this.handleError);
  }

  getCurrentUser(): Observable<any> {
    let url = environment.API + '/ws/users/current';
    return this.http.get(url).map((res: Response) => res.json());
  }

  logout(): Observable<any> {
    return new Observable((observer) => {
      localStorage.removeItem('access_token');
      observer.complete();
    });
  }

  authenticateSuccess(token: string): string {
    localStorage.setItem('access_token', token);
    return token;
  }

  getUsers(): Observable<User[]> {

    const url = environment.API + '/ws/users';

    return this
      .http
      .get(url)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
 * Handle server errors.
 * @param error .
 */
  private handleError(error: Response | any) {
    let err: {};
    if (error instanceof Response) {
      const body = error.json() || '';
      err = body.error || body;
    } else {
      err = {};
    }
    console.error(err);
    return Promise.reject(err);
  }

}
