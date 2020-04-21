import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {Society, SocietyView} from '../entities/society.model';
import {HttpClient, HttpParams} from '@angular/common/http';


import {LoaderService} from './loader.service';
import {LegalInformation} from '../entities/legal-information.model';


@Injectable()
export class SocietyService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getSociety(reference: string): Observable<Society> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies';

    const options = {params: new HttpParams().set('societyReference', reference)};

    return this.http.get<Society>(url, options);

  }

  searchSocieties(term: string): Observable<SocietyView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies/auto-complete';
    const options = {params: new HttpParams().set('term', term)};

    return this.http.get<SocietyView[]>(url, options);
  }

  getSocieties(): Observable<SocietyView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/societies/all';

    return this.http.get<SocietyView[]>(url);
  }


  createSociety(society: Society): Observable<Society> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';
    return this.http.post<Society>(url, society);
  }

  updateSociety(society: Society, reference: string): Observable<Society> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';
    const options = {params: new HttpParams().set('societyReference', reference)};
    return this.http
      .put<Society>(url, society, options);
  }

  deleteSociety(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies';

    const options = {params: new HttpParams().set('societyReference', reference)};


    return this.http.delete(url, options);
  }

  getSocietyLegalInformation(societyReference: string): Observable<LegalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/legal_information';

    const options = {params: new HttpParams().set('societyReference', societyReference)};

    return this
      .http.get<LegalInformation>(url, options);
  }

  updateSocietyLegalInformation(info: LegalInformation, societyReference: string): Observable<LegalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/legal_information';

    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this.http
      .put<LegalInformation>(url, info, options);
  }

  getSocietyContact(societyReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contact';


    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this
      .http
      .get<Contact>(url, options);
  }

  updateSocietyContact(contact: Contact, societyReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contact';

    const options = {params: new HttpParams().set('societyReference', societyReference)};


    return this.http
      .put<Contact>(url, contact, options);
  }


}
