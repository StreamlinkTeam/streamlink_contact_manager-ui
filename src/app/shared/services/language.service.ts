import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Language} from '../entities/language.model';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class LanguageService {

  constructor(private http: Http) {}

  getLanguages(reference: string): Observable<Language[]> {
    const url = environment.API + '/ws/languages';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
      options.search = params;
    }

    return this
      .http
      .get(url, options)
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

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('reference', reference);
    options.search = params;

    return this.http
      .put(url, language, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteLanguage(reference: string) {
    const url = environment.API + '/ws/languages';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('reference', reference);
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
