import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../entities/token.model';
import {User} from '../entities/user.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from './loader.service';
import {Photo} from '../entities/photo.model';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  authenticate(username: string, password: string): Observable<boolean> {

    const url = environment.API + '/ws/users/login';

    const options = {
      params: new HttpParams().set('username', username)
        .set('password', password)
    };
    const user = {
      username: username,
      password: password
    };

    return this.http.post<Token>(url, user)
      .map(token => {
        this.authenticateSuccess(token);
        return true;
      });
  }

  getCurrentUser(): Observable<User> {
    const url = environment.API + '/ws/users/current';
    return this.http.get<User>(url)
      ._finally(() => {
      });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {

    const url = environment.API + '/ws/users/current/password';

    const options = {
      params: new HttpParams().set('oldPassword', oldPassword)
        .set('newPassword', newPassword)
    };

    return this.http.put<any>(url, options)
      ._finally(() => {
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

    const url = environment.API + '/ws/users/all';

    return this.http.get<User[]>(url);
  }

  getUser(reference: string): Observable<User> {

    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};

    return this.http.get<User>(url, options)
      ._finally(() => {
      });

  }

  createUser(user: User): Observable<User> {
    const url = environment.API + '/ws/users';
    return this.http.post<User>(url, user);
  }

  updateUser(user: User, reference: string): Observable<User> {
    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};


    return this.http
      .put<User>(url, user, options)
      ._finally(() => {
      });
  }

  deleteUser(reference: string) {
    const url = environment.API + '/ws/users';

    const options = {params: new HttpParams().set('userReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
      });
  }

  // __________________Photo_Services_______________________________

  getUsersAvatars(userReference: string): Observable<Photo[]> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/avatar';

    const options = {params: new HttpParams().set('userReference', userReference)};


    return this
      .http
      .get<Photo[]>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getUserAvatar(reference: string, userReference: string): Observable<Photo> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/userAvatar';

    const options = {
      params: new HttpParams()
        .set('reference', reference)
        .set('UserReference', userReference)
    };

    return this.http.get<Photo>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


  getPhotoByUserReference(userReference: string): Observable<Photo> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/userAvatarByUser';

    const options = {
      params: new HttpParams().set('userReference', userReference)
    };

    return this.http.get<Photo>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getUserAvatar2(userReference: string): Observable<Photo> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/avatar';

    const options = {
      params: new HttpParams().set('userReference', userReference)
    };


    return this
      .http
      .get<Photo>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  createUserAvatar(fileToUpload: File, userReference: string): Observable<Photo> {
    this.loaderService.show();
    const url = environment.API + '/ws/users/avatar';

    const formData: FormData = new FormData();
    formData.append('avatar', fileToUpload, fileToUpload.name);

    const options = {params: new HttpParams().set('userReference', userReference)};


    return this.http
      .put<Photo>(url, formData, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  deleteAvatar(reference: string, userReference: string) {
    this.loaderService.show();
    const url = environment.API + '/ws/users/avatar';

    const options = {params: new HttpParams().set('userReference', userReference).set('reference', reference)};


    return this.http
      .delete(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  usersCount(): Observable<any> {
    const url = environment.API + '/ws/users/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }

  changeUserPassword(userReference: string,
                     oldPassword: string,
                     newPassword: string): Observable<any> {

    const url = environment.API + '/ws/users/updateUserPassword' + '?userReference=' + userReference + '&oldPassword=' + oldPassword + '&newPassword=' + newPassword;

    const options = {
      params: new HttpParams().set('userReference', userReference)
        .set('oldPassword', oldPassword)
        .set('newPassword', newPassword)
    };

    return this.http.put<any>(url, options)
      ._finally(() => {
      });

  }
}
