import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import {DeveloperView} from '../entities/developer-view.model';
import {Developer} from '../entities/developer.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Response, Headers} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DeveloperService {

  constructor(private http: HttpClient) {}

  getDevelopers(reference: string): Observable<DeveloperView[]> {
    const url = environment.API + '/ws/developers';

    const params: HttpParams = new HttpParams();

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
    }

    return this
      .http
      .get(url, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }




  createDevelopers(developer: Developer) {
    const url = environment.API + '/ws/developers';
    return this.http
      .post(url, developer)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateDeveloper(developer: Developer, reference: string) {
    const url = environment.API + '/ws/developers';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .put(url, developer, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteDeveloper(reference: string) {
    const url = environment.API + '/ws/developers';

    const params: HttpParams = new HttpParams();

    params.set('reference', reference);

    return this.http
      .delete(url, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);



    return this
      .http
      .get(url, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/skills';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .put(url, skills, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  getDeveloperInfo(developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';


    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);




    return this
      .http
      .get(url, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/personal_info';

    const params: HttpParams = new HttpParams();
    params.set('developerReference', developerReference);

    return this.http
      .put(url, info, {params: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  /**
 * Handle server errors.
 * @param error .
 */
  private handleError(error: Response | any) {
    let err: {};
    if (error instanceof Response) {
      const body = error.json() || '';
      err = body.error || body;
    } else {
      err = {};
    }
    console.error(err);
    return Promise.reject(err);
  }

}
