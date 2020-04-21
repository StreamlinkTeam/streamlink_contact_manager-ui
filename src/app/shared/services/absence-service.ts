import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoaderService} from './loader.service';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Absence} from '../entities/absence.model';
import {finalize} from 'rxjs/operators';

@Injectable()
export class AbsenceService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }
  createAbsence(absence: Absence): Observable<Absence> {
    const url = environment.API + '/ws/absences';
    return this.http.post<Absence>(url, absence);
  }
  getAllAbsence(): Observable<Absence[]>  {
    const url = environment.API + '/ws/absences/all';
    return this.http.get<Absence[]>(url);
  }

  getAllResourceAbsence(developerReference: string): Observable<Absence[]> {

    const url = environment.API + '/ws/absences/resource';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<Absence[]>(url, options);
  }

  getAllAbsenceByManager(): Observable<Absence[]> {
    this.loaderService.show();
    const url = environment.API + '/ws/absences/manager';

    return this.http.get<Absence[]>(url)
      .pipe(finalize(() => {
        this.loaderService.hide();
      }));
  }

  getAllAbsenceByListRef(reference) {
    const url = environment.API + '/ws/absences/absence-reference';
    return this.http.get(url + '?reference=' + reference);
  }

  validateAbsence(absence) {
    const url = environment.API + '/ws/absences/validate';
    return this.http.put(url, absence);
  }

}

