import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

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
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    userService.getUsers().subscribe(response => this.users = response);
    if (this.editing) {
      service.getDeveloper(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.developer = response
          , error =>
            this.router.navigate(['/developers', 'error']));
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

    if (form.valid) {
      if (this.editing) {
        this.service.updateDeveloper(this.developer, this.developer.reference)
          .subscribe(
            response => {

              this.developer = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createDevelopers(this.developer)
          .subscribe(response => {

            this.toastr.success('Developpeur Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/developers/edit', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création du candidats', 'Opération échoué !!!');
          });
      }
    }
  }
}
