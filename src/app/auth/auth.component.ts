import {AuthService} from '../shared/services/auth.service';
import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'auth.component.html'
})
export class AuthComponent {

  public username: string;
  public password: string;
  public errorMessage: string;

  constructor(private router: Router, private auth: AuthService) {}

  authenticate(form: NgForm) {
    if (form.valid) {
      this.auth.authenticate(this.username, this.password)
        .subscribe(response => {
          console.info(response);

          if (response) {
            this.router.navigateByUrl('/developer');
          }
          this.errorMessage = 'Authentication Failed';
        });
    } else {
      this.errorMessage = 'Form Data Invalid';
    }
  }
}
