import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'developer-editor.component.html'
})
export class DeveloperEditorComponent {

  editing = false;
  developer: Developer = new Developer();
  users: User[];
  stages: any[];


  constructor(private service: DeveloperService, private userService: UserService,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';
    userService.getUsers().subscribe(response => this.users = response);
    console.info(activeRoute.snapshot.parent.params['reference']);
    if (this.editing) {
      service.getDeveloper(activeRoute.snapshot.parent.params['reference']).subscribe(response => this.developer = response);
      console.info(this.developer);
    }

    this.stages = [
      {label: 'A traiter', value: 'ToTreat'},
      {label: 'En Cours de Qualif', value: 'InTheProcessOfQualifying'},
      {label: 'Vivier', value: 'Vivier'},
      {label: 'Vivier ++', value: 'VivierPlus'},
      {label: 'Converti en Ressource', value: 'ConvertedToResource'},
      {label: 'Ne plus contacter', value: 'StopContacting'}
    ];

  }

  save(form: NgForm) {

    if (this.editing) {
      console.info(this.developer);
      this.service.updateDeveloper(this.developer, this.developer.reference).
        subscribe(response => console.info(response.reference));

    } else {
      let reference: string;
      this.service.createDevelopers(this.developer).subscribe(response => reference = response.reference);
      this.router.navigateByUrl('developer/edit/' + reference);

    }
  }
}
