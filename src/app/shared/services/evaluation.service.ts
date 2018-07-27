import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Evaluation} from '../entities/evaluation.model';
import {HttpResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient) {}

  getEvaluations(developerReference: string): Observable<Evaluation[]> {
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<Evaluation[]>(url, options)
      .catch(this.handleError);
  }




  createEvaluation(evaluation: Evaluation, developerReference: string): Observable<Evaluation> {
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http
      .post<Evaluation>(url, evaluation, options)
      .catch(this.handleError);
  }

  updateEvaluation(evaluation: Evaluation, reference: string, developerReference: string): Observable<Evaluation> {
    const url = environment.API + '/ws/developers/evaluations';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .put<Evaluation>(url, evaluation, options)
      .catch(this.handleError);
  }

  deleteEvaluation(reference: string, developerReference: string) {
    const url = environment.API + '/ws/developers/evaluations';

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
