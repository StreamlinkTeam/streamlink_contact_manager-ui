import {DeveloperView} from '../shared/entities/developer-view.model';
import {Developer} from '../shared/entities/developer.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';


@Component({
  selector: 'developer',
  moduleId: module.id,
  templateUrl: 'developer.component.html'
})
export class DeveloperComponent implements OnInit {

  developers: DeveloperView[];

  experience: SelectItem[];

  stage: SelectItem[];

  cols: any[];


  constructor(private service: DeveloperService) {}

  getdevelopers(): DeveloperView[] {

    this.service.getDevelopers(null).subscribe(val => this.developers = val);

    return this.developers;
  }


  ngOnInit() {
    this.getdevelopers();


    this.cols = [
      {field: 'firstname', header: 'First Name'},
      {field: 'lastname', header: 'Last Name'},
      {field: 'stage', header: 'Stage'},
      {field: 'mobility', header: 'Mobility'},
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

}
