import {AuthService} from '../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/entities/user.model';
import {Observable} from 'rxjs';
import {Resource} from '../shared/entities/resource.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  currentUser$: Observable<Resource | User>;

  constructor(private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {
      this.currentUser$ = this.auth.getCurrentUser();
    }
  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {
    return this.isLoggedIn() && this.auth.isAdmin();
  }

  isClient() {
    return this.isLoggedIn() && this.auth.isClient();
  }

  isResource() {
    return this.isLoggedIn() && this.auth.isResource();
  }


  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/auth');

  }

}
