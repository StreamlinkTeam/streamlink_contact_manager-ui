import {DeveloperView} from '../shared/entities/developer-view.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ServerDataSource} from "ng2-smart-table";



@Component({
  moduleId: module.id,
  templateUrl: 'developer-table.component.html'
})
export class DeveloperTableComponent implements OnInit {

  developers: DeveloperView[];

  source: ServerDataSource;


  settings = {
    columns: {
      firstname: {
        title: 'Nom'
      },
      lastname: {
        title: 'Prénom'
      },
      stage: {
        title: 'Etape'
      },
      mobility: {
        title: 'Mobilité'
      },
      experience: {
        title: 'Experience'
      },
      email1: {
        title: 'Email'
      }
    }
  };
  cols: any[];
  experience: any[];
  stage: any[];


  constructor(private service: DeveloperService, private http: HttpClient) {
  }

  /* getDevelopers(): DeveloperView[] {

     this.service.getDevelopers().subscribe(val => this.developers = val);

     return this.developers;
   }*/

  ngOnInit() {
    /*
        this.getDevelopers();
    */

    const url = environment.API + '/api/developer/search/filter?value=';
    this.source = new ServerDataSource(this.http, {
      endPoint: url,
      dataKey: 'embedded.developer',
      totalKey: 'page.totalElements',
      pagerLimitKey:'size',
      perPage: 'page.size',
      pagerPageKey: 'page',
      page: 0
    });


    console.log(this.source);

    console.info(this.developers);


    this.cols = [
      {field: 'firstname', header: 'Nom'},
      {field: 'lastname', header: 'Prénom'},
      {field: 'stage', header: 'Etape'},
      {field: 'mobility', header: 'Mobilité'},
      {field: 'experience', header: 'Experience'},
      {field: 'email1', header: 'Email'}
    ];


    this.stage = [
      {label: 'Tous', value: null},
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];

    this.experience = [
      {label: 'Tous', value: null},
      {label: 'Non', value: 'NON'},
      {label: 'Entre 1 et 2 ans', value: 'BETWEEN1AND2'},
      {label: 'Entre 3 et 5 ans', value: 'BETWEEN3AND5'},
      {label: 'Entre 6 et 10 ans', value: 'BETWEEN6ND10'},
      {label: 'Plus que 10 ans', value: 'MORE_THAN_10'}];
  }

  deleteDeveloper(developer: DeveloperView) {

    if (confirm('Suppression du Developpeur' + developer.firstname + ' ' + developer.lastname)) {

      console.info(developer);
      this.service.deleteDeveloper(developer.reference).subscribe(res => {
        console.info(res);
        const index = this.developers.indexOf(developer);
        this.developers.splice(index, 1)
      });

    }
  }

}
