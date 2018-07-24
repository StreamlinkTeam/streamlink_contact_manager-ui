import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {DeveloperView} from '../entities/developer-view.model';
import {Developer} from '../entities/developer.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpHeaders} from '@angular/common/http';
import {HttpResponse} from '@angular/common/http';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient) {}

  getDeveloper(reference: string): Observable<Developer> {

    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};

    const developer = this
      .http
      .get<Developer>(url, options)
      .catch(this.handleError);

    console.info(developer);
    console.info(reference);

    return developer;
  }

  getDevelopers(): Observable<DeveloperView[]> {
    const url = environment.API + '/ws/developers/all';

    return this
      .http
      .get<DeveloperView[]>(url)
      .catch(this.handleError);
  }




  createDevelopers(developer: Developer): Observable<Developer> {
    const url = environment.API + '/ws/developers';
    return this.http
      .post<Developer>(url, developer)
      .catch(this.handleError);
  }

  updateDeveloper(developer: Developer, reference: string): Observable<Developer> {
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .put<Developer>(url, developer, options)
      .catch(this.handleError);
  }

  deleteDeveloper(reference: string) {
    const url = environment.API + '/ws/developers';

    const options = {params: new HttpParams().set('developerReference', reference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      .catch(this.handleError);
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<SkillsInformation>(url, options)
      .catch(this.handleError);
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/skills';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .put(url, skills, {params: params})
      .map((res: HttpResponse<SkillsInformation>) => res.body)
      .catch(this.handleError);
  }


  getDeveloperInfo(developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<PersonalInformation>(url, options)
      .catch(this.handleError);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<PersonalInformation>(url, info, options)
      .catch(this.handleError);
  }

  getDeveloperContact(developerReference: string): Observable<Contact> {
    const url = environment.API + '/ws/developers/contact';


    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this
      .http
      .get<Contact>(url, options)
      .catch(this.handleError);
  }

  updateDeveloperContact(contact: Contact, developerReference: string): Observable<Contact> {
    const url = environment.API + '/ws/developers/contact';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http
      .put<Contact>(url, contact, options)
      .catch(this.handleError);
  }

  /**
 * Handle server errors.
 * @param error .
 */
  private handleError(error: HttpResponse<any> | any) {


    console.error(error);
    return Promise.reject(error);
  }

}
