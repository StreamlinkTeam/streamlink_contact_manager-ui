import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Absence } from '../entities/Absence.model';
import { Action } from '../entities/action.model';

@Injectable()
export class AbsenceService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }
  createAbsence(absence: Absence): Observable<Absence> {
    const url = environment.API + '/ws/absence';
    return this.http.post<Absence>(url, absence);
  }
  getAllAbsence() {
    const url = environment.API + '/ws/all';
    return this.http.get<Absence[]>(url);
  }

  getAllAbsenceByUser(mail) {
    const url = environment.API + '/ws/absence/all';
    return this.http.get<Absence[]>(url + '?mail=' + mail);
  }

  getAllAbsenceByManager(): Observable<Absence[]> {
    this.loaderService.show();
    const url = environment.API + '/ws/manager';

    return this.http.get<Absence[]>(url)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getAllAbsenceByListRef(reference) {
    const url = environment.API + '/ws/absence/absence-reference';
    return this.http.get(url + '?reference=' + reference);
  }

  validateAbsence(absence) {
    const url = environment.API + '/ws/absence/validate';
    return this.http.put(url, absence);
  }

}

