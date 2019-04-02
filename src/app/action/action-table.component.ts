import {Action} from './../shared/entities/action.model';
import {ActionService} from './../shared/services/action.service';
import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-action-table',
  moduleId: module.id,
  templateUrl: 'action-table.component.html'
})
export class ActionTableComponent implements OnInit {

  actions: Action[];

  constructor(private service: ActionService) {

  }

  ngOnInit() {

    this.service.getAllActions().subscribe(res => {
      this.actions = res;
    });
  }


}
