import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Contact} from '../entities/contact.model';
import { DeveloperResponse } from '../entities/developer-view.model';
import {Developer} from '../entities/developer.model';
import {PersonalInformation} from '../entities/personal-information.model';
import {SkillsInformation} from '../entities/skills-information.model';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class DeveloperService {

  constructor(private http: Http) {}

  getDevelopers(reference: string): Observable<DeveloperResponse[]> {
    const url = environment.API + '/ws/developers';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    if (reference === undefined || reference === null) {
      params.set('reference', reference);
      options.search = params;
    }

    return this
      .http
      .get(url, options)
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

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('reference', reference);
    options.search = params;

    return this.http
      .put(url, developer, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  deleteDeveloper(reference: string) {
    const url = environment.API + '/ws/developers';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();

    params.set('reference', reference);
    options.search = params;

    return this.http
      .delete(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDeveloperSkills(developerReference: string): Observable<SkillsInformation> {
    const url = environment.API + '/ws/developers/skills';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);

    options.search = params;


    return this
      .http
      .get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateDeveloperSkills(skills: SkillsInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/skills';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);
    options.search = params;

    return this.http
      .put(url, skills, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }


  getDeveloperInfo(developerReference: string): Observable<PersonalInformation> {
    const url = environment.API + '/ws/developers/personal_info';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);

    options.search = params;


    return this
      .http
      .get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  updateDeveloperInfo(info: PersonalInformation, developerReference: string) {
    const url = environment.API + '/ws/developers/personal_info';

    const options = new RequestOptions();
    const params: URLSearchParams = new URLSearchParams();
    params.set('developerReference', developerReference);
    options.search = params;

    return this.http
      .put(url, info, options)
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
