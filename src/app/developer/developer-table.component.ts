import {DeveloperService} from '../shared/services/developer.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ServerDataSource} from "ng2-smart-table";
import {Row} from "ng2-smart-table/lib/data-set/row";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  moduleId: module.id,
  templateUrl: 'developer-table.component.html'
})
export class DeveloperTableComponent implements OnInit {

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
      firstname: {
        title: 'Nom',
        filter: false
      },
      lastname: {
        title: 'Prénom',
        filter: false
      },
      stage: {
        title: 'Etape',
        filter: false
      },
      mobility: {
        title: 'Mobilité',
        filter: false
      },
      experience: {
        title: 'Experience',
        filter: false
      },
      email1: {
        title: 'Email',
        filter: false
      }
    },
    // actions: false,
    pager: {
      perPage: 5
    },
  };

  experiences: any[];
  stages: any[];
  formations: any[];


  constructor(private service: DeveloperService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/developers']);
    }
  }


  ngOnInit() {

    this.url = environment.API + '/ws/developers/search?fromAngular=true';

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
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];

    this.experiences = [
      {label: 'Tous', value: ''},
      {label: 'Non', value: 'NON'},
      {label: 'Entre 1 et 2 ans', value: 'BETWEEN1AND2'},
      {label: 'Entre 3 et 5 ans', value: 'BETWEEN3AND5'},
      {label: 'Entre 6 et 10 ans', value: 'BETWEEN6AND10'},
      {label: 'Plus que 10 ans', value: 'MORE_THAN_10'}];

    this.formations = [
      {label: 'Tous', value: ''},
      {label: 'Non défini', value: 'NOT_DEFINED'},
      {label: 'Bac', value: 'BAC'},
      {label: 'Bac +2', value: 'BAC_PLUS_2'},
      {label: 'Bac +3', value: 'BAC_PLUS_3'},
      {label: 'Bac +4', value: 'BAC_PLUS_4'},
      {label: 'Bac +5', value: 'BAC_PLUS_5'},
      {label: 'Bac +6', value: 'BAC_PLUS_6'},
      {label: 'Bac +7', value: 'BAC_PLUS_7'},
      {label: 'Bac +8', value: 'BAC_PLUS_8'}];
  }


  onSelectChange(key: string = null, value: string = null) {

    const parameters = new URLSearchParams(this.url);
    if (value == null || value === "") {

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

  showDeveloper(rowData: Row) {

    let developer = rowData.getData();

    this.router.navigate(['/developer/edit', developer.reference]);

  }

  deleteDeveloper(rowData: Row) {

    let developer = rowData.getData();
    if (confirm('Suppression du Developpeur' + developer.firstname + ' ' + developer.lastname)) {

      console.info(developer);
      this.service.deleteDeveloper(developer.reference).subscribe(res => {

        this.source.remove(rowData);
        this.toastr.success('Condidats Supprimer avec succés', 'Opération Réussite!');

      }, error => {
        this.toastr.error('Erreur lors de la suppression du condidats', 'Opération échoué !!!');
      });

    }
  }

}