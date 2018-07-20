import { Developer } from '../shared/entities/developer.model';
import { DeveloperService } from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'developer-editor.component.html'
})
export class DeveloperEditorComponent {

  editing = false;
  developer: Developer = new Developer();

  constructor(private service: DeveloperService,
    private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.params['mode'] === 'edit';
    console.info(activeRoute.snapshot.params['reference']);
    if (this.editing) {
      Object.assign(this.developer,
        service.getDeveloper(activeRoute.snapshot.params['reference']));
    }
  }

  save(form: NgForm) {
    this.service.createDevelopers(this.developer);
    this.router.navigateByUrl('/developer');
  }
}
