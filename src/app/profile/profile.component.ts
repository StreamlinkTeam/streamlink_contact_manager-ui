import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'profile.component.html'
})
export class ProfileComponent {


  constructor(private router: Router,
              activeRoute: ActivatedRoute) {
  }


}
