import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Language} from '../entities/language.model';
import {HttpResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class LanguageService {

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    const url = environment.API + '/ws/languages';

    return this.http.get<Language[]>(url);
  }




  createLanguages(language: Language) {
    const url = environment.API + '/ws/languages';
    return this.http
      .post(url, language)
      .map((res: HttpResponse<Language>) => res.body);
  }

  updateLanguage(language: Language, reference: string) {
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, language, {params: params})
      .map((res: HttpResponse<Language>) => res.body);
  }

  deleteLanguage(reference: string) {
    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .delete(url, {params: params})
      .map((res: HttpResponse<any>) => res.body);
  }


}
