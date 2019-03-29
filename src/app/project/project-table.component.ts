import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CustomEnumRenderComponent} from '../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {ProjectService} from '../shared/services/project.service';


@Component({
  moduleId: module.id,
  templateUrl: 'project-table.component.html'
})
export class ProjectTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: ''
    },
    edit: {
      editButtonContent: 'Editer'
    },
    delete: {
      deleteButtonContent: 'Supprimer'
    },
    noDataMessage: 'Pas de valeur disponible !',
    actions: {
      columnTitle: '',
      add: false,
      position: 'right'
    },
    mode: 'external',
    columns: {
      title: {
        title: 'Title',
        filter: false
      },
      type: {
        title: 'Type',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      activityArea: {
        title: 'Secteur',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      stage: {
        title: 'Etape',
        filter: false,
        type: 'custom',
        renderComponent: CustomEnumRenderComponent
      },
      client: {
        title: 'Client',
        filter: false,
        // sort: false
      }
    },
    // actions: false,
    pager: {
      perPage: 5
    },
  };

  stages: any[];
  types: any[];


  constructor(private service: ProjectService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/projects']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/projects/search?fromAngular=true';

    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });


    console.log(this.source);

    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'En cours', value: 'InProgress'},
      {label: 'Reporté', value: 'Postponed'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Perdu', value: 'Lost'},
      {label: 'Abandonné', value: 'Abandoned'}];

    this.types = [
      {label: 'Tous', value: ''},
      {label: 'Régie', value: 'Authority'},
      {label: 'Forfait', value: 'FlatRate'},
      {label: 'Projet interne', value: 'InternalProject'},
      {label: 'Produit', value: 'Product'},
      {label: 'Recrutement', value: 'Recruitment'}];
  }


  onSelectChange(key: string = null, value: string = null) {

    const parameters = new URLSearchParams(this.url);
    if (value == null || value === '') {

      parameters.delete(key);
    } else {
      parameters.set(key, value);

    }

    this.url = decodeURIComponent(parameters.toString());
    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });

    console.log(this.source);
  }

  onSearch(query: string = '') {

    const parameters = new URLSearchParams(this.url);
    parameters.set('value', query);

    this.url = decodeURIComponent(parameters.toString());

    this.source = new ServerDataSource(this.http, {
      endPoint: this.url,
      dataKey: 'content',
      totalKey: 'totalElements',
      pagerLimitKey: 'size',
      perPage: 'size',
      sortFieldKey: 'sort',
      sortDirKey: 'dir',
      pagerPageKey: 'page'
    });

    console.log(this.source);

  }

  showProject(rowData: Row) {

    const project = rowData.getData();

    this.router.navigate(['/projects/edit', project.reference]);

  }

  deleteProject(rowData: Row) {

    const project = rowData.getData();
    if (confirm('Suppression du Projet ' + project.title)) {

      this.service.deleteProject(project.reference)
        .subscribe(res => {

          this.source.remove(rowData);
          this.toastr.success('Projet Supprimé avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de du Projet', 'Opération échoué !!!');
        });

    }
  }

}
