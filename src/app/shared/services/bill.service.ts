import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Bill} from '../entities/bill.model';

@Injectable()
export class BillService {

  constructor(private http: HttpClient) {
  }

  getBillByReference(billReference: string): Observable<Bill> {

    const url = environment.API + '/ws/bills/one';
    const options = {params: new HttpParams().set('billReference', billReference)};
    return this.http.get<Bill>(url, options)
      ._finally(() => {
      });
  }
}
