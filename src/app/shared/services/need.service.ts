import { Need, NeedView, NeedInformation } from './../entities/need.model';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';


@Injectable()
export class NeedService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getNeed(needReference: string): Observable<Need> {

    // this.loaderService.show();
    const url = environment.API + '/ws/needs';

    const options = {params: new HttpParams().set('needReference', needReference)};

    return this.http.get<Need>(url, options);
  }

  getNeeds(): Observable<NeedView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/needs/all';

    return this.http.get<NeedView[]>(url);
  }


  createNeeds(need: Need): Observable<Need> {

    // this.loaderService.show();
    const url = environment.API + '/ws/needs';

    return this.http.post<Need>(url, need);
  }

  updateNeed(need: Need, needReference: string): Observable<Need> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs';

    const options = {params: new HttpParams().set('needReference', needReference)};


    return this.http
      .put<Need>(url, need, options);
  }

  deleteNeed(needReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs';

    const options = {params: new HttpParams().set('needReference', needReference)};


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }


  getNeedInformation(needReference: string): Observable<NeedInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/information';


    const options = {params: new HttpParams().set('needReference', needReference)};


    return this
      .http
      .get<NeedInformation>(url, options);
  }

  updateNeedInformation(info: NeedInformation, needReference: string): Observable<NeedInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/information';

    const options = {params: new HttpParams().set('needReference', needReference)};


    return this.http
      .put<NeedInformation>(url, info, options);
  }

  searchNeeds(term: string): Observable<NeedView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/needs/auto-complete';
    const options = {params: new HttpParams().set('term', term)};

    return this.http.get<NeedView[]>(url, options);
  }

}
