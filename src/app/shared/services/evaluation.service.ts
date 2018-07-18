import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Evaluation} from '../entities/evaluation.model';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class EvaluationService {

  constructor(private http: Http) {}

  getEvaluations(reference: string, developerReference: string): Observable<Evaluation[]> {
    const url = environment.API + '/ws/evaluations';

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




  createEvaluations(evaluation: Evaluation, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);
    options.search = params;

    return this.http
      .post(url, evaluation, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateEvaluation(evaluation: Evaluation, reference: string, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('developerReference', developerReference);
    params.set('reference', reference);
    options.search = params;

    return this.http
      .put(url, evaluation, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteEvaluation(reference: string, developerReference: string) {
    const url = environment.API + '/ws/evaluations';

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
