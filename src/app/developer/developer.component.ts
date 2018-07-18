import {DeveloperResponse} from '../shared/entities/developer-view.model';
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

  developers: DeveloperResponse[];

  experience: SelectItem[];

  stage: SelectItem[];

  cols: any[];


  constructor(private service: DeveloperService) {}

  getdevelopers(): DeveloperResponse[] {

    this.service.getDevelopers(null).subscribe(val => this.developers = val);

    return this.developers;
  }


  ngOnInit() {
    this.getdevelopers();

    this.cols = [
      {field: 'firstname', header: 'firts'},
      {field: 'lastname', header: 'name'},
      {field: 'stage', header: 'stage'},
      {field: 'mobility', header: 'Mobility'},
      {field: 'skillsInformation.experience', header: 'experience'},
      {field: 'contact.email1', header: 'email'}

    ];

    this.stage = [
      {label: 'Tous', value: null},
      {label: 'ToTreat', value: 'ToTreat'},
      {label: 'Green', value: 'InTheProcessOfQualifying'},
      {label: 'Silver', value: 'Vivier'},
      {label: 'Black', value: 'VivierPlus'},
      {label: 'Red', value: 'ConvertedToResource'},
      {label: 'Maroon', value: 'StopContacting'}
    ];

    this.experience = [
      {label: 'Tous', value: null},
      {label: 'BETWEEN1AND2', value: 'NON'},
      {label: 'Green', value: 'BETWEEN1AND2'},
      {label: 'BETWEEN3AND5', value: 'BETWEEN3AND5'},
      {label: 'BETWEEN6ND10', value: 'BETWEEN6ND10'},
      {label: 'MORE_THAN_10', value: 'MORE_THAN_10'}];
  }

}
