import {AuthService} from '../shared/services/auth.service';
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ValidatorService} from '../shared/services/validator.service';

@Component({
  moduleId: module.id,
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  username: string;
  password: string;

  errorMessage: string;
  errorFields: string [];


  constructor(private router: Router, private auth: AuthService
    , private validator: ValidatorService) {
  }

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          if (response) {
            this.router.navigateByUrl('/developer');
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
