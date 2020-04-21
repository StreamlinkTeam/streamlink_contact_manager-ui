import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';


import {LoaderService} from './loader.service';
import { ProjectInformation, ProjectView} from '../entities/project.model';
import {ProjectPos} from '../entities/project-pos.model';
import {map} from 'rxjs/operators';


@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  createProjectFromPositioning(positioningReference: string): Observable<ProjectPos> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos/from-positioning';

    const options = {params: new HttpParams().set('positioningReference', positioningReference)};


    return this.http
      .post<ProjectPos>(url, null, options);
  }


  getProject(projectReference: string): Observable<ProjectPos> {

    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};

    return this.http.get<ProjectPos>(url, options);

  }

  getProjects(): Observable<ProjectPos[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos/all';

    return this.http.get<ProjectPos[]>(url);
  }


  createProjectold(projectPos: ProjectPos): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    return this.http.post<ProjectPos>(url, projectPos);
  }

  createProject(projectPos: ProjectPos): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projects';

    return this.http.post<ProjectPos>(url, projectPos);
  }

  createRealProject(projectPos: ProjectPos): Observable<ProjectPos> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projects/create';

    return this.http.post<ProjectPos>(url, projectPos);
  }

  updateProject(project: ProjectPos, projectReference: string): Observable<ProjectPos> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<ProjectPos>(url, project, options);
  }

  deleteProject(projectReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/projectspos';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }


  getProjectInformation(projectReference: string): Observable<ProjectInformation> {

    const url = environment.API + '/ws/projects/information';


    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this
      .http
      .get<ProjectInformation>(url, options);
  }

  updateProjectInformation(info: ProjectInformation, projectReference: string): Observable<ProjectInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/projects/information';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<ProjectInformation>(url, info, options);
  }

  searchProjects(term: string): Observable<ProjectView[]> {

    // this.loaderService.show();
    const url = environment.API + '/ws/projects/auto-complete';
    const options = {params: new HttpParams().set('term', term)};

    return this.http.get<ProjectView[]>(url, options);
  }

}
