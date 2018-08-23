import {SocietyService} from '../shared/services/society.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  moduleId: module.id,
  templateUrl: 'society-table.component.html'
})
export class SocietyTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;


  settings = {
    attr: {
      class: 'table table-striped table-sm'
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
      label: {
        title: 'Nom',
        filter: false
      },
      activityArea: {
        title: 'Secteur',
        filter: false
      },
      note: {
        title: 'Informations',
        filter: false
      },
      stage: {
        title: 'Etat',
        filter: false
      },
      city: {
        title: 'Lieu',
        filter: false
      }
    },
    // actions: false,
    pager: {
      perPage: 5
    },
  };

  stages: any[];


  constructor(private service: SocietyService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/societies']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/societies/search?fromAngular=true';

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
      {label: 'Prospect', value: 'Prospect'},
      {label: 'Client', value: 'Customer'},
      {label: 'Partenaire', value: 'Partner'},
      {label: 'Fournisseur', value: 'Provider'},
      {label: 'Archivé', value: 'Archive'}];
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

  showSociety(rowData: Row) {

    const society = rowData.getData();

    this.router.navigate(['/society/edit', society.reference]);

  }

  deleteSociety(rowData: Row) {

    const society = rowData.getData();
    if (confirm('Suppression de la Société' + society.label)) {

      console.info(society);
      this.service.deleteSociety(society.reference).subscribe(res => {

        this.source.remove(rowData);
        this.toastr.success('Société Supprimée avec succés', 'Opération Réussite!');

      }, error => {
        this.toastr.error('Erreur lors de la suppression de la Société', 'Opération échoué !!!');
      });

    }
  }

}
