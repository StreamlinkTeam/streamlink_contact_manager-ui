import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Resource} from '../shared/entities/resource.model';
import {ResourceService} from '../shared/services/resource.service';
import {Observable} from 'rxjs';
import {UserService} from '../shared/services/user.service';

@Component({
  moduleId: module.id,
  templateUrl: 'resource.component.html',
  styleUrls: ['resource.component.css']

})
export class ResourceComponent {

  editing = false;
  reference: string;
  resource$: Observable<Resource>;
  currentResource = false;



  constructor(private router: Router,
              activeRoute: ActivatedRoute,
              private resourceService: ResourceService,
              private userService: UserService) {

    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    this.reference = activeRoute.snapshot.params['reference'];
    if (this.reference) {
     this.resource$ =  this.resourceService.getResource(this.reference);
    } else if (activeRoute.snapshot.url[1].toString() === 'profile') {
      this.resource$ = (<Observable<Resource>>this.userService.getCurrentUser());
      this.currentResource = true;
      this.editing = true;
    } else {
      this.reference = null;
      this.router.navigate(['/' + activeRoute.snapshot.url[0].toString() + '/create']);
    }
  }


}
