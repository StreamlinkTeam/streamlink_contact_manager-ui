import {Observable} from 'rxjs/Observable';
import {Avatar} from '../entities/avatar.model';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoaderService} from './loader.service';

@Injectable()
export class AvatarService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }


  getAvatarByUserReference(userReference: string, isResource: boolean): Observable<Avatar> {
    this.loaderService.show();
    let url = environment.API;

    let options = {};

    if (isResource) {
      url = url + '/ws/resources/avatar';

      options = {
        params: new HttpParams().set('developerReference', userReference)
      };
    } else {
      url = url + '/ws/users/avatar';

      options = {
        params: new HttpParams().set('userReference', userReference)
      };
    }
    return this.http.get<Avatar>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


  createAvatar(fileToUpload: File, userReference: string, isResource: boolean): Observable<Avatar> {
    this.loaderService.show();
    let url = environment.API;

    let options = {};

    if (isResource) {
      url = url + '/ws/resources/avatar';

      options = {
        params: new HttpParams().set('developerReference', userReference)
      };
    } else {
      url = url + '/ws/users/avatar';

      options = {
        params: new HttpParams().set('userReference', userReference)
      };
    }

    const formData: FormData = new FormData();
    formData.append('avatar', fileToUpload, fileToUpload.name);

    // const options = {params: new HttpParams().set('userReference', userReference)};


    return this.http
      .put<Avatar>(url, formData, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  deleteAvatar(reference: string, userReference: string, isResource: boolean) {
    this.loaderService.show();
    let url = environment.API;

    let options ={};

    if (isResource) {
      url = url + '/ws/resources/avatar';

      options = {
        params: new HttpParams().set('developerReference', userReference).set('reference', reference)
      };
    } else {
      url = url + '/ws/users/avatar';

      options = {
        params: new HttpParams().set('userReference', userReference).set('reference', reference)
      };
    }

    if (isResource) {
      url = url + '/ws/resources/avatar';
    } else {
      url = environment.API + '/ws/users/avatar';
    }
    // const options = {params: new HttpParams().set('userReference', userReference).set('reference', reference)};


    return this.http
      .delete(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }
}
