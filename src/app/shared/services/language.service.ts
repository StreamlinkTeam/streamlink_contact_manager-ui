import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Language} from '../entities/language.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import {LoaderService} from './loader.service';
import {map} from 'rxjs/operators';


@Injectable()
export class LanguageService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getLanguages(): Observable<Language[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/languages';

    return this.http.get<Language[]>(url);
  }


  createLanguages(language: Language) {

    const url = environment.API + '/ws/languages';
    return this.http
      .post<Language>(url, language);
  }

  updateLanguage(language: Language, reference: string) {

    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, language, {params: params})
      .pipe(map((res: HttpResponse<Language>) => res.body));
  }

  deleteLanguage(reference: string) {

    const url = environment.API + '/ws/languages';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .delete(url, {params: params})
      .pipe(map((res: HttpResponse<any>) => res.body));
  }


}
