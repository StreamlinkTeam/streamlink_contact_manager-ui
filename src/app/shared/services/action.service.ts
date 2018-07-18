import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Action} from '../entities/action.model';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class ActionService {

  constructor(private http: Http) {}

  getActions(reference: string, developerReference: string): Observable<Action[]> {
    const url = environment.API + '/ws/actions';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
    }
    options.search = params;


    return this
      .http
      .get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }




  createActions(action: Action, developerReference: string) {
    const url = environment.API + '/ws/actions';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);
    options.search = params;

    return this.http
      .post(url, action, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateAction(action: Action, reference: string, developerReference: string) {
    const url = environment.API + '/ws/actions';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('developerReference', developerReference);
    params.set('reference', reference);
    options.search = params;

    return this.http
      .put(url, action, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteAction(reference: string, developerReference: string) {
    const url = environment.API + '/ws/actions';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('reference', reference);
    params.set('developerReference', developerReference);

    options.search = params;

    return this.http
      .delete(url, options)
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
