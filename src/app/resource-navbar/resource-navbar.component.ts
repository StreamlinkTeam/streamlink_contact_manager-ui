import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from '../shared/services/auth.service';
import {ResourceNavbarService} from './rousource-navbar.service';
import {Resource} from '../shared/entities/resource.model';

@Component({
  selector: 'app-resource-navbar',
  templateUrl: './resource-navbar.component.html',
  styleUrls: ['./resource-navbar.component.css']
})
export class ResourceNavbarComponent implements OnInit {

  currentResource$: Observable<Resource>;

  constructor(private router: Router, private auth: AuthService,
              private resourceNavbarService: ResourceNavbarService) {
  }

  ngOnInit(): void {

    if (this.auth.isAuthenticated()) {

      this.currentResource$ = (<Observable<Resource>>this.auth.getCurrentUser());

      this.resourceNavbarService.update.subscribe(() => {
        this.currentResource$ = (<Observable<Resource>>this.auth.getCurrentUser());

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
