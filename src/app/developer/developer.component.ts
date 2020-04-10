import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeveloperService } from '../shared/services/developer.service';
import { Developer } from '../shared/entities/developer.model';
import {Observable} from 'rxjs';

@Component({
  moduleId: module.id,
  templateUrl: 'developer.component.html',
  styleUrls: ['developer.component.css']

})
export class DeveloperComponent {

  editing = false;
  reference: string;
  developer$: Observable<Developer>;

  constructor(private router: Router,
    activeRoute: ActivatedRoute,
    private developerService: DeveloperService) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    this.reference = activeRoute.snapshot.params['reference'];
    if (this.reference) {
      this.developer$ = this.developerService.getDeveloper(this.reference);
    } else {
      this.reference = null;
      this.router.navigate(['/' + activeRoute.snapshot.url[0].toString() + '/create']);
    }
  }


}
