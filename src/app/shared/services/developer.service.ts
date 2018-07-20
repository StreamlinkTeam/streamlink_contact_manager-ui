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

    const options = {params: new HttpParams().set('reference', reference)};

    const developer = this
      .http
      .get<any[]>(url, options)
      .catch(this.handleError)[0];

    console.info(developer);
    console.info(reference);

    return developer;
  }

  getDevelopers(): Observable<DeveloperView[]> {
    const url = environment.API + '/ws/developers';

    return this
      .http
      .get<DeveloperView[]>(url)
      .catch(this.handleError);
  }




  createDevelopers(developer: Developer) {
    const url = environment.API + '/ws/developers';
    return this.http
      .post(url, developer)
      .map((res: HttpResponse<DeveloperView>) => res.body)
      .catch(this.handleError);
  }

  updateDeveloper(developer: Developer, reference: string) {
    const url = environment.API + '/ws/developers';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, developer, {params: params})
      .map((res: HttpResponse<DeveloperView[]>) => res.body)
      .catch(this.handleError);
  }

  deleteDeveloper(reference: string) {
    const url = environment.API + '/ws/developers';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .delete(url, {params: params})
      .map((res: HttpResponse<any>) => res.body)
      .catch(this.handleError);
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);



    return this
      .http
      .get(url, {params: params})
      .map((res: HttpResponse<SkillsInformation>) => res.body)
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


    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this
      .http
      .get(url, {params: params})
      .map((res: HttpResponse<PersonalInformation>) => res.body)
      .catch(this.handleError);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/personal_info';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .put(url, info, {params: params})
      .map((res: HttpResponse<PersonalInformation>) => res.body)
      .catch(this.handleError);
  }

  getDeveloperContact(developerReference: string): Observable<Contact> {
    const url = environment.API + '/ws/developers/contact';


    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this
      .http
      .get(url, {params: params})
      .map((res: HttpResponse<Contact>) => res.body)
      .catch(this.handleError);
  }

  updateDeveloperContact(contact: Contact, developerReference: string) {
    const url = environment.API + '/ws/developers/contact';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .put(url, contact, {params: params})
      .map((res: HttpResponse<Contact>) => res.body)
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
