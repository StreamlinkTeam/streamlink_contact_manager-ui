import {NeedService} from './../shared/services/need.service';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {environment} from './../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CustomEnumRenderComponent} from './../shared/custom-ng2-smart-table-renderer/custom-enum-render.component';
import {Component, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-need-table',
  templateUrl: 'need-table.component.html',
  moduleId: module.id,
})
export class NeedTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: ''
    },
    edit: {
      editButtonContent: '<a class="btn btn-info" title="Modifier ou consulter"><i class="fa fa-pencil-square-o"></i></a>'
    },
    delete: {
      deleteButtonContent: '<a class="btn btn-danger" title="Supprimer"><i class="fa fa-trash-o"></i></a>'
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


  constructor(private service: NeedService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/needs']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/needs/search?fromAngular=true';

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

    // console.log(this.source);
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

    // console.log(this.source);

  }

  showNeed(rowData: Row) {

    const need = rowData.getData();

    this.router.navigate(['/needs/edit', need.reference]);

  }

  deleteNeed(rowData: Row) {

    const need = rowData.getData();
    if (confirm('Suppression du Besoin ' + need.title)) {

      this.service.deleteNeed(need.reference)
        .subscribe(res => {

          this.source.remove(rowData);
          this.toastr.success('Besoin Supprimé avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de du Besoin', 'Opération échoué !!!');
        });

    }
  }
}
