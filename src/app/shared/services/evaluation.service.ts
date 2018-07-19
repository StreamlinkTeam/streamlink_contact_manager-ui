import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Evaluation} from '../entities/evaluation.model';
import { HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Response, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient) {}

  getEvaluations(reference: string, developerReference: string): Observable<Evaluation[]> {
    const url = environment.API + '/ws/evaluations';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
    }


    return this
      .http
      .get(url, {params : params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }




  createEvaluations(evaluation: Evaluation, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .post(url, evaluation, {params : params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateEvaluation(evaluation: Evaluation, reference: string, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

    const params: HttpParams = new HttpParams();

    params.set('developerReference', developerReference);
    params.set('reference', reference);

    return this.http
      .put(url, evaluation, {params : params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteEvaluation(reference: string, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);
    params.set('developerReference', developerReference);


    return this.http
      .delete(url, {params : params})
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
