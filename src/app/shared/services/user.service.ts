import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Token} from '../entities/token.model';
import {User} from '../entities/user.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from './loader.service';
import {Resource} from '../entities/resource.model';


@Injectable()
export class UserService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  authenticate(username: string, password: string): Observable<boolean> {

    const url = environment.API + '/ws/users/login';


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

  getCurrentUser(): Observable<User | Resource> {
    const url = environment.API + '/ws/users/current';
    return this.http.get<User | Resource>(url)
      ._finally(() => {
      });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {

    const url = environment.API + '/ws/users/current/password';

    const password = {
      oldPassword: oldPassword,
      newPassword: newPassword
    };

    return this.http.put<any>(url, password)
      ._finally(() => {
      });

  }


  logout(): boolean {
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('user_reference');
    sessionStorage.clear();
    localStorage.clear();

    return true;
  }

  authenticateSuccess(token: Token): Token {

    localStorage.setItem('access_token', token.access_token);
    localStorage.setItem('user_reference', token.user_reference);

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

  // // __________________Avatar_Services_______________________________
  //
  //
  // getUserAvatar(reference: string, userReference: string): Observable<Avatar> {
  //   this.loaderService.show();
  //   const url = environment.API + '/ws/users/userAvatar';
  //
  //   const options = {
  //     params: new HttpParams()
  //       .set('reference', reference)
  //       .set('UserReference', userReference)
  //   };
  //
  //   return this.http.get<Avatar>(url, options)
  //     ._finally(() => {
  //       this.loaderService.hide();
  //     });
  // }
  //
  //
  // getPhotoByUserReference(userReference: string): Observable<Avatar> {
  //   this.loaderService.show();
  //   const url = environment.API + '/ws/users/avatar';
  //
  //   const options = {
  //     params: new HttpParams().set('userReference', userReference)
  //   };
  //
  //   return this.http.get<Avatar>(url, options)
  //     ._finally(() => {
  //       this.loaderService.hide();
  //     });
  // }
  //
  //
  // createUserAvatar(fileToUpload: File, userReference: string): Observable<Avatar> {
  //   this.loaderService.show();
  //   const url = environment.API + '/ws/users/avatar';
  //
  //   const formData: FormData = new FormData();
  //   formData.append('avatar', fileToUpload, fileToUpload.name);
  //
  //   const options = {params: new HttpParams().set('userReference', userReference)};
  //
  //
  //   return this.http
  //     .put<Avatar>(url, formData, options)
  //     ._finally(() => {
  //       this.loaderService.hide();
  //     });
  // }
  //
  // deleteAvatar(reference: string, userReference: string) {
  //   this.loaderService.show();
  //   const url = environment.API + '/ws/users/avatar';
  //
  //   const options = {params: new HttpParams().set('userReference', userReference).set('reference', reference)};
  //
  //
  //   return this.http
  //     .delete(url, options)
  //     ._finally(() => {
  //       this.loaderService.hide();
  //     });
  // }

  usersCount(): Observable<any> {
    const url = environment.API + '/ws/users/count';
    return this.http.get<any>(url)
      ._finally(() => {
      });
  }
}
