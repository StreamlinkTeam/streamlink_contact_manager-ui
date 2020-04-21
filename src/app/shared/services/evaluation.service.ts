import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Evaluation} from '../entities/evaluation.model';
import {HttpClient, HttpParams} from '@angular/common/http';


import {LoaderService} from './loader.service';


@Injectable()
export class EvaluationService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getEvaluations(developerReference: string, isResource: boolean): Observable<Evaluation[]> {

    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/evaluations';
    } else {
      url = environment.API + '/ws/developers/evaluations';
    }
    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<Evaluation[]>(url, options);
  }


  createEvaluation(evaluation: Evaluation, developerReference: string, isResource: boolean): Observable<Evaluation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/evaluations';
    } else {
      url = environment.API + '/ws/developers/evaluations';
    }
    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http
      .post<Evaluation>(url, evaluation, options);
  }

  updateEvaluation(evaluation: Evaluation, reference: string, developerReference: string, isResource: boolean): Observable<Evaluation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/evaluations';
    } else {
      url = environment.API + '/ws/developers/evaluations';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .put<Evaluation>(url, evaluation, options);
  }

  deleteEvaluation(reference: string, developerReference: string, isResource: boolean) {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/evaluations';
    } else {
      url = environment.API + '/ws/developers/evaluations';
    }
    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options);
  }

}
