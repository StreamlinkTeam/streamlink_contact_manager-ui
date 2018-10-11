import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {environment} from '../../../environments/environment';

import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

import {LoaderService} from './loader.service';
import {Project, ProjectInformation, ProjectView} from '../entities/project.model';


@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getProject(projectReference: string): Observable<Project> {

    this.loaderService.show();
    const url = environment.API + '/ws/projects';

    const options = {params: new HttpParams().set('projectReference', projectReference)};

    return this.http.get<Project>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });

  }

  getProjects(): Observable<ProjectView[]> {

    this.loaderService.show();
    const url = environment.API + '/ws/projects/all';

    return this.http.get<ProjectView[]>(url)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


  createProjects(project: Project): Observable<Project> {

    this.loaderService.show();
    const url = environment.API + '/ws/projects';

    return this.http.post<Project>(url, project)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  updateProject(project: Project, projectReference: string): Observable<Project> {
    this.loaderService.show();
    const url = environment.API + '/ws/projects';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<Project>(url, project, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  deleteProject(projectReference: string) {
    this.loaderService.show();
    const url = environment.API + '/ws/projects';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .delete(url, options)
      .map((res: HttpResponse<any>) => res.body)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


  getProjectInformation(projectReference: string): Observable<ProjectInformation> {
    this.loaderService.show();
    const url = environment.API + '/ws/projects/information';


    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this
      .http
      .get<ProjectInformation>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  updateProjectInformation(info: ProjectInformation, projectReference: string): Observable<ProjectInformation> {
    this.loaderService.show();
    const url = environment.API + '/ws/projects/information';

    const options = {params: new HttpParams().set('projectReference', projectReference)};


    return this.http
      .put<ProjectInformation>(url, info, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


}
