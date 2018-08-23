import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'society.component.html'
})
export class SocietyComponent {

  editing = false;
  referenceSociety: string;


  constructor(private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.referenceSociety = activeRoute.snapshot.params['reference'];
    } else {
      this.referenceSociety = null;
    }
  }


}
