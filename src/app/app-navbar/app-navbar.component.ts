import {AuthService} from '../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/entities/user.model';
import {AppNavbarService} from './app-navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  user: User;

  constructor(private router: Router, private auth: AuthService,
              private appNavbarService: AppNavbarService) {
  }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {

      this.auth.getCurrentUser()
        .subscribe(response => this.user = response
          , error =>
            this.router.navigate(['/developers', 'error']));

      this.appNavbarService.update.subscribe(() => {
        this.auth.getCurrentUser()
          .subscribe(response => this.user = response
            , error =>
              this.router.navigate(['/developers', 'error']));
      });

    }

  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }


  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/auth');

  }

}
