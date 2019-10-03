import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ProductionService {
  url = environment.API + '/ws/';
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url + 'production/all');
  }
}
