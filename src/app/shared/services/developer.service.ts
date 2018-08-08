import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {DeveloperView} from '../entities/developer-view.model';
import {Developer} from '../entities/developer.model';
import {CV} from '../entities/cv.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient) {
  }

  getDeveloper(reference: string): Observable<Developer> {

    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};

    return this.http.get<Developer>(url, options);
  }

  getDevelopers(): Observable<DeveloperView[]> {
    const url = environment.API + '/ws/developers/all';

    return this.http.get<DeveloperView[]>(url);
  }


  createDevelopers(developer: Developer): Observable<Developer> {
    const url = environment.API + '/ws/developers';
    return this.http.post<Developer>(url, developer);
  }

  updateDeveloper(developer: Developer, reference: string): Observable<Developer> {
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Developer>(url, developer, options);
  }

  deleteDeveloper(reference: string) {
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body);
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<SkillsInformation>(url, options);
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<SkillsInformation>(url, skills, options);
  }


  getDeveloperInfo(developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<PersonalInformation>(url, options);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<PersonalInformation>(url, info, options);
  }

  getDeveloperContact(developerReference: string): Observable<Contact> {
    const url = environment.API + '/ws/developers/contact';


    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<Contact>(url, options);
  }

  updateDeveloperContact(contact: Contact, developerReference: string): Observable<Contact> {
    const url = environment.API + '/ws/developers/contact';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<Contact>(url, contact, options);
  }

  getDeveloperCVs(developerReference: string): Observable<CV[]> {
    const url = environment.API + '/ws/developers/cv';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<CV[]>(url, options);
  }

  createDeveloperCv(fileToUpload: File, developerReference: string): Observable<CV> {
    const url = environment.API + '/ws/developers/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .post<CV>(url, formData, options);
  }

  deleteCV(reference: string, developerReference: string) {
    const url = environment.API + '/ws/developers/cv';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http
      .delete(url, options);
  }


}
