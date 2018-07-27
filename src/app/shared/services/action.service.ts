import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Action} from '../entities/action.model';
import {HttpResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ActionService {

  constructor(private http: HttpClient) {}

  getActions(developerReference: string): Observable<Action[]> {
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<Action[]>(url, options)
      .catch(this.handleError);
  }




  createAction(action: Action, developerReference: string): Observable<Action> {
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http
      .post<Action>(url, action, options)
      .catch(this.handleError);
  }

  updateAction(action: Action, reference: string, developerReference: string): Observable<Action> {
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .put<Action>(url, action, options)
      .catch(this.handleError);
  }

  deleteAction(reference: string, developerReference: string) {
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options)
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
