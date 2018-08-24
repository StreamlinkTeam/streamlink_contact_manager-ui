import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'society-contact.component.html'
})
export class SocietyContactComponent {

  societyReference: string;
  societyContactReference: string;


  constructor(private router: Router,
    activeRoute: ActivatedRoute) {

      this.societyReference = activeRoute.snapshot.params['reference'];

  }


}
