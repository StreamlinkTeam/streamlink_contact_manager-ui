import {Action} from '../shared/entities/action.model';
import {ActionService} from '../shared/services/action.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'action-editor.component.html'
})
export class ActionEditorComponent {

  editing = false;
  action: Action = new Action();
  reference: string;

  types: any[];


  actions: Action[];


  constructor(private service: ActionService, private router: Router,
              activeRoute: ActivatedRoute) {

    this.reference = activeRoute.snapshot.parent.params['reference'];
    this.service.getActions(this.reference).subscribe(response => this.actions = response);


    this.types = [
      {label: 'Note', value: 'NOTE'},
      {label: 'Rappel / To do', value: 'RECALL'},
      {label: 'Présentation Client', value: 'CUSTOMER_PRESENTATION'},
      {label: 'Entretien Téléphonique', value: 'TELEPHONE_INTERVIEW'},
      {label: 'Entretien Physique', value: 'PHYSICAL_MAINTENANCE'},
      {label: 'Appel', value: 'CALL'},
      {label: 'Email', value: 'EMAIL'}];

  }

  showAction(index: number, form: NgForm) {


    const act = this.actions[index];

    if (act.reference !== this.action.reference) {
      form.resetForm();

      this.action = Object.assign({}, this.actions[index]);
      this.editing = true;
    }
  }

  newAction(form: NgForm) {

    form.resetForm();

    this.action = new Action();
    this.editing = false;

  }

  deleteAction(index: number) {

    if (confirm('Suppression de l\'Action')) {
      const act = this.actions[index];

      if (act.reference === this.action.reference) {
        this.action = new Action();
        this.editing = false;
      }

      this.service.deleteAction(act.reference, this.reference).subscribe(response => {
        console.info(response);
        this.actions.splice(index, 1);
      });
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateAction(this.action, this.action.reference, this.reference).subscribe(response => {
          this.service.getActions(this.reference).subscribe(res => this.actions = res);
          this.action = new Action();
          this.editing = false;

        });
      } else {
        this.service.createAction(this.action, this.reference).subscribe(response => {
          this.service.getActions(this.reference).subscribe(res => this.actions = res);
          this.action = new Action();
        });
      }
      form.resetForm();

    }

  }
}
