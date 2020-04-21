import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Contact } from '../entities/contact.model';

import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';


import { LoaderService } from './loader.service';
import { SocietyContact, SocietyContactView } from '../entities/society-contact.model';
import {map} from 'rxjs/operators';

@Injectable()
export class SocietyContactService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getSocietyContact(societyContactReference: string, societyReference: string): Observable<SocietyContact> {


    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };

    return this.http.get<SocietyContact>(url, options);

  }

  getAllSocietyContact() {
    const url = environment.API + '/ws/societies/contacts/tous';

    return this.http.get<SocietyContact>(url);
  }

  getSocietyContacts(societyReference: string): Observable<SocietyContactView[]> {

    const url = environment.API + '/ws/societies/contacts/all';

    const options = { params: new HttpParams().set('societyReference', societyReference) };

    return this.http.get<SocietyContactView[]>(url, options);
  }


  createSocietyContacts(societyContact: SocietyContact, societyReference: string): Observable<SocietyContact> {

    const url = environment.API + '/ws/societies/contacts';
    const options = {
      params: new HttpParams().set('societyReference', societyReference)
    };
    return this.http.post<SocietyContact>(url, societyContact, options);
  }

  updateSocietyContact(societyContact: SocietyContact, societyContactReference: string,
    societyReference: string): Observable<SocietyContact> {
    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .put<SocietyContact>(url, societyContact, options);
  }

  deleteSocietyContact(societyContactReference: string, societyReference: string) {
    const url = environment.API + '/ws/societies/contacts';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }


  getSocietyContactContact(societyContactReference: string, societyReference: string): Observable<Contact> {

    const url = environment.API + '/ws/societies/contacts/contact';


    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this
      .http
      .get<Contact>(url, options);
  }

  updateSocietyContactContact(contact: Contact, societyContactReference: string, societyReference: string): Observable<Contact> {

    const url = environment.API + '/ws/societies/contacts/contact';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };


    return this.http
      .put<Contact>(url, contact, options);
  }




}
