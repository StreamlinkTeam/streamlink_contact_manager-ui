import {AuthService} from '../shared/services/auth.service';
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidatorService} from '../shared/services/validator.service';

@Component({
  moduleId: module.id,
  templateUrl: 'auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  username: string;
  password: string;

  errorMessage: string;
  errorFields: string [];

  constructor(private router: Router, private auth: AuthService, private validator: ValidatorService) {
  }


  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            if (this.auth.isAdmin()) {
               this.router.navigate(['/needs']);
            } else if (this.auth.isResource())  { this.router.navigate(['/dashboard']);
              } else {
              this.router.navigate(['/developers']);
            }

          }
          this.errorMessage = 'Erreur d\'authentification';
        }, err => {
          this.errorMessage = 'Erreur d\'authentification';
        });
    } else {
      this.errorMessage = 'Données du formulaire invalide';
      this.errorFields = this.validator.getFormValidationMessages(form);
    }
  }
}
