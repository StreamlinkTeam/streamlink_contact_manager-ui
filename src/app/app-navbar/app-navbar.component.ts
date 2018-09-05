import {AuthService} from '../shared/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {


  ngOnInit(): void {

  }

  isLoggedIn() {
    return this.auth.isAuthenticated();
  }

  isAdmin() {

    return this.auth.isAdmin();
  }


  constructor(private router: Router, private auth: AuthService) {
  }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl('/auth');

  }

}
