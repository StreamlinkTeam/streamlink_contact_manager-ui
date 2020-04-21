import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './loader.service';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AbsenceList } from '../entities/absence-list.model';

@Injectable()
export class AbsenceListService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getAllAbcenseListByManager(): Observable<any> {
    const url = environment.API + '/ws/managerReference';

    return this.http.get(url);
  }

  createAbsenceList(absenceList): Observable<AbsenceList> {
    this.loaderService.show();
    const url = environment.API + '/ws/absenceList';
    return this.http.post<AbsenceList>(url, absenceList)
      .pipe(finalize(() => {
        this.loaderService.hide();
      }));
  }

  createNewAbsenceList(): Observable<AbsenceList> {
    this.loaderService.show();
    const url = environment.API + '/ws/absence_list/save';
    return this.http.post<AbsenceList>(url, {})
      .pipe(finalize(() => {
        this.loaderService.hide();
      }));
  }

  saveAbsenceList(absenceList) {
    const url = environment.API + '/ws/absenceList';
    return this.http.post<AbsenceList>(url, absenceList);
  }

  validateList(absenceList) {
    const url = environment.API + '/ws/absence_list/validate';
    return this.http.put(url, absenceList);
  }
}

