import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AbsenceManage} from '../entities/AbsenceManage.model';
import {Action} from '../entities/action.model';

@Injectable()
export class AbsenceManageService {

  constructor(private http: HttpClient) {
  }


  getAbsenceManageByResource(resourceReference: string): Observable<AbsenceManage> {

    const url = environment.API + '/ws/absenceManage/byResource';

    const options = {params: new HttpParams().set('resourceReference', resourceReference)};

    return this.http.get<AbsenceManage>(url, options)
      ._finally(() => {
      });

  }

  getAbsenceManage(absenceManageReference: string): Observable<AbsenceManage> {

    const url = environment.API + '/ws/absenceManage';

    const options = {params: new HttpParams().set('absenceManageReference', absenceManageReference)};

    return this.http.get<AbsenceManage>(url, options)
      ._finally(() => {
      });

  }

  updateAbsenceManage(absenceManage: AbsenceManage, resourceReference: string): Observable<AbsenceManage> {
    const url = environment.API + '/ws/absenceManage';
    const options = {params: new HttpParams().set('resourceReference', resourceReference)};
    return this.http.put<AbsenceManage>(url, absenceManage, options);
  }

  createAbsence(absenceManage: AbsenceManage, resourceReference: string): Observable<AbsenceManage> {
    const url = environment.API + '/ws/absenceManage/create';
    const options = {params: new HttpParams().set('resourceReference', resourceReference)};
    return this.http.post<Action>(url, AbsenceManage, options);
  }

}
