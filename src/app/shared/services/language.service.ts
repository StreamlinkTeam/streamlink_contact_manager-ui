import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Language} from '../entities/language.model';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Http, Response, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class LanguageService {

  constructor(private http: HttpClient) {}

  getLanguages(reference: string): Observable<Language[]> {
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
    }

    return this
      .http
      .get(url, {params : params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }




  createLanguages(language: Language) {
    const url = environment.API + '/ws/languages';
    return this.http
      .post(url, language)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateLanguage(language: Language, reference: string) {
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, language, {params : params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteLanguage(reference: string) {
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

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
