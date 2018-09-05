import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../shared/entities/user.model';
import {UserService} from '../../shared/services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.users-editor.component.html'
})
export class UserEditorComponent {

  editing = false;
  user: User = new User();
  reference: string;


  constructor(private service: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.params['reference'] !== undefined;

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
    }

    if (this.editing) {
      service.getUser(this.reference)
        .subscribe(response => this.user = response
          , error =>
            this.router.navigate(['/admin/users', 'error']));
    }

  }


  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.user.password = "UNDEFINED";
        this.service.updateUser(this.user, this.reference)
          .subscribe(
            response => {

              this.user = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createUser(this.user)
          .subscribe(response => {

            this.toastr.success('Utilisateur Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/admin/users/edit', response.reference]);

          }, error => {
            // let err = error as HttpErrorResponse;
            this.toastr.error('Erreur lors de la création de l\'Utilisateur :\n'+error.error.description, 'Opération échoué !!!');
          });
      }
    }
  }
}
