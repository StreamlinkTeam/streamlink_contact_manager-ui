import { Injectable } from '@angular/core';
import { Commande } from '../entities/commande.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class CommandeService {

  BASE_URL = environment.API + '/ws/commande';
  constructor(private http: HttpClient) { }

  getAllCommandes(): Observable<Commande[]> {
    const url = this.BASE_URL + '/all';
    return this.http.get<Commande[]>(url);
  }

  getCommandeById(id): Observable<Commande> {
    const url = this.BASE_URL + '/' + id;
    return this.http.get<Commande>(url);
  }

  save(commande) {
    console.log('Commande :: ', commande);
    const url = this.BASE_URL + '/save';
    return this.http.post(url, commande);
  }


}
