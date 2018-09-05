import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})
export class AdminComponent {


  constructor(private router: Router,
    activeRoute: ActivatedRoute) {
  }


}
