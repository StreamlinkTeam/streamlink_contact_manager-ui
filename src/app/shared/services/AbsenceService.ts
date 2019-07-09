import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoaderService} from './loader.service';

import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Absence} from '../entities/Absence.model';

@Injectable()
export class AbsenceService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }
  createAbsence(absence: Absence): Observable<Absence> {
    this.loaderService.show();
    const url = environment.API + '/ws/absence';
    return this.http.post<Absence>(url, absence)
      ._finally(() => {
        this.loaderService.hide();
      });
  }
}

