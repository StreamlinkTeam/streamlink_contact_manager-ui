import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  moduleId: module.id,
  templateUrl: 'developer.component.html'
})
export class DeveloperComponent {

  editing = false;
  reference: string;


  constructor(private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';

    if (this.editing) {
      this.reference = activeRoute.snapshot.params['reference'];
    } else {
      this.reference = null;
      this.router.navigate(['/'+activeRoute.snapshot.url[0].toString()+'/create' ]);
    }
  }


}
