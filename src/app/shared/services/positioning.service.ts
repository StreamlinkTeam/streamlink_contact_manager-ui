import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';


import { LoaderService } from './loader.service';
import { Positioning } from '../entities/positioning.model';
import {map} from 'rxjs/operators';


@Injectable()
export class PositioningService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getPositioning(positioningReference: string): Observable<Positioning> {

    //// this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = { params: new HttpParams().set('positioningReference', positioningReference) };

    return this.http.get<Positioning>(url, options);

  }

  getPositionings(): Observable<Positioning[]> {

    //// this.loaderService.show();
    const url = environment.API + '/ws/positionings/current';

    return this.http.get<Positioning[]>(url);
  }


  createPositionings(positioning: Positioning): Observable<Positioning> {

    //// this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    return this.http.post<Positioning>(url, positioning);
  }

  updatePositioning(positioning: Positioning, positioningReference: string): Observable<Positioning> {
    //// this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = { params: new HttpParams().set('positioningReference', positioningReference) };


    return this.http
      .put<Positioning>(url, positioning, options);
  }

  deletePositioning(positioningReference: string) {
    //// this.loaderService.show();
    const url = environment.API + '/ws/positionings';

    const options = { params: new HttpParams().set('positioningReference', positioningReference) };


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getPositioningsRsource(): Observable<Positioning[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/positionings/current';

    return this.http.get<Positioning[]>(url);
    // this.loaderService.hide();
  }

}
