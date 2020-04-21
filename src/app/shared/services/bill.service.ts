import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill } from '../entities/bill.model';

@Injectable()
export class BillService {

  API_URL = environment.API + '/ws/bills';
  constructor(private http: HttpClient) {
  }

  getBillByReference(billReference: string): Observable<Bill> {
    const url = this.API_URL + '/one';
    const options = { params: new HttpParams().set('billReference', billReference) };
    return this.http.get<Bill>(url, options);
  }

  updateBill(bill: Bill, reference: string): Observable<Bill> {
    const url = environment.API + '/ws/bills';
    const options = {params: new HttpParams().set('billReference', reference)};
    return this.http
      .put<Bill>(url, bill, options);
  }

  getBillById(id): Observable<Bill> {
    const url = this.API_URL + '/bill/one';

    return this.http.get<Bill>(url + '?id=' + id);
  }

  createBill(bill) {
    const url = this.API_URL + '/create';
    return this.http.post(url, bill);
  }

  getAll() {
    const url = this.API_URL + '/all';
    return this.http.get(url);
  }

  getByCommande(id) {
    const url = this.API_URL + '/commande/all';
    return this.http.get(url + '?id=' + id);
  }
}
