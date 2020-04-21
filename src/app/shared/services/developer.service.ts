import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {Developer, DeveloperView} from '../entities/developer.model';
import {CV} from '../entities/cv.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';


import {LoaderService} from './loader.service';
import {map} from 'rxjs/operators';


@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getDeveloper(reference: string): Observable<Developer> {

    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http.get<Developer>(url, options);

  }


  getDevelopers(): Observable<DeveloperView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/developers/all';

    return this.http.get<DeveloperView[]>(url);
  }


  createDevelopers(developer: Developer): Observable<Developer> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';
    return this.http.post<Developer>(url, developer);
  }

  updateDeveloper(developer: Developer, reference: string): Observable<Developer> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Developer>(url, developer, options);
  }

  deleteDeveloper(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getDeveloperSkills(developerReference: string, isResource: boolean): Observable<SkillsInformation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/skills';
    } else {
      url = environment.API + '/ws/developers/skills';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<SkillsInformation>(url, options);
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string, isResource: boolean): Observable<SkillsInformation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/skills';
    } else {
      url = environment.API + '/ws/developers/skills';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<SkillsInformation>(url, skills, options);
  }


  getDeveloperInfo(developerReference: string, isResource: boolean): Observable<PersonalInformation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/personal_info';
    } else {
      url = environment.API + '/ws/developers/personal_info';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<PersonalInformation>(url, options);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string, isResource: boolean): Observable<PersonalInformation> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/personal_info';
    } else {
      url = environment.API + '/ws/developers/personal_info';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<PersonalInformation>(url, info, options);
  }

  getDeveloperContact(developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/contact';


    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this
      .http
      .get<Contact>(url, options);
  }

  updateDeveloperContact(contact: Contact, developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/developers/contact';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .put<Contact>(url, contact, options);
  }

  getDeveloperCVs(developerReference: string, isResource: boolean): Observable<CV[]> {
    //  this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/cv';
    } else {
      url = environment.API + '/ws/developers/cv';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<CV[]>(url, options);
  }

  createDeveloperFromCv(fileToUpload: File): Observable<DeveloperView> {
    //  this.loaderService.show();
    const url = environment.API + '/ws/developers/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    return this.http
      .post<DeveloperView>(url, formData);
  }

  createDeveloperCv(fileToUpload: File, developerReference: string, isResource: boolean): Observable<CV> {
    //  this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/cv';
    } else {
      url = environment.API + '/ws/developers/cv';
    }

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<CV>(url, formData, options);
  }

  deleteCV(reference: string, developerReference: string, isResource: boolean) {
    //  this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/cv';
    } else {
      url = environment.API + '/ws/developers/cv';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options);
  }

}
