import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Action} from '../entities/action.model';
import {HttpClient, HttpParams} from '@angular/common/http';


import {LoaderService} from './loader.service';


@Injectable()
export class ActionService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getActions(developerReference: string, isResource: boolean): Observable<Action[]> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/actions';
    } else {
      url = environment.API + '/ws/developers/actions';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<Action[]>(url, options);
  }

  getAllActions(): Observable<Action[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/';

    return this.http.get<Action[]>(url);
  }

  createAction(action: Action, developerReference: string, isResource: boolean): Observable<Action> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/actions';
    } else {
      url = environment.API + '/ws/developers/actions';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http.post<Action>(url, action, options);
  }

  updateAction(action: Action, reference: string, developerReference: string, isResource: boolean): Observable<Action> {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/actions';
    } else {
      url = environment.API + '/ws/developers/actions';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http.put<Action>(url, action, options);
  }

  deleteAction(reference: string, developerReference: string, isResource: boolean) {
    // this.loaderService.show();
    let url = environment.API;

    if (isResource) {
      url = url + '/ws/resources/actions';
    } else {
      url = environment.API + '/ws/developers/actions';
    }

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http.delete(url, options);
  }

  getSocietyActions(societyContactReference: string, societyReference: string): Observable<Action[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';


    if (societyContactReference == null) {
      const options = {
        params: new HttpParams().set('societyReference', societyReference)
      };

      return this.http.get<Action[]>(url, options);
    } else {
      const options = {
        params: new HttpParams().set('societyContactReference', societyContactReference)
          .set('societyReference', societyReference)
      };

      return this.http.get<Action[]>(url, options);
    }
  }


  createSocietyAction(action: Action, societyContactReference: string, societyReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };
    return this.http.post<Action>(url, action, options);
  }

  updateSocietyAction(action: Action, reference: string, societyContactReference: string, societyReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    if (societyContactReference != null) {
      const options = {
        params: new HttpParams().set('societyContactReference', societyContactReference)
          .set('societyReference', societyReference).set('reference', reference)
      };

      return this.http.put<Action>(url, action, options);
    } else {
      const options = {
        params: new HttpParams().set('societyReference', societyReference).set('reference', reference)
      };

      return this.http.put<Action>(url, action, options);

    }
  }

  deleteSocietyAction(reference: string, societyContactReference: string, societyReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference).set('reference', reference)
    };


    return this.http.delete(url, options);
  }

  getProjectActions(projectReference: string): Observable<Action[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/actions';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http.get<Action[]>(url, options);
  }


  createProjectAction(action: Action, projectReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/actions';

    const options = {params: new HttpParams().set('projectReference', projectReference)};

    return this.http.post<Action>(url, action, options);
  }

  updateProjectAction(action: Action, reference: string, projectReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/actions';

    const options = {params: new HttpParams().set('projectReference', projectReference).set('reference', reference)};


    return this.http.put<Action>(url, action, options);
  }

  deleteProjectAction(reference: string, projectReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/actions';

    const options = {params: new HttpParams().set('projectReference', projectReference).set('reference', reference)};


    return this.http.delete(url, options);
  }

  public getNeedActions(needReference: string): Observable<Action[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/actions';

    const options = {params: new HttpParams().set('needReference', needReference)};


    return this.http.get<Action[]>(url, options);
  }


  public createNeedAction(action: Action, needReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/actions';

    const options = {params: new HttpParams().set('needReference', needReference)};

    return this.http.post<Action>(url, action, options);
  }

  updateNeedAction(action: Action, reference: string, needReference: string): Observable<Action> {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/actions';

    const options = {params: new HttpParams().set('needReference', needReference).set('reference', reference)};


    return this.http.put<Action>(url, action, options);
  }

  deleteNeedAction(reference: string, needReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/needs/actions';

    const options = {params: new HttpParams().set('needReference', needReference).set('reference', reference)};

    return this.http.delete(url, options);
  }

}
