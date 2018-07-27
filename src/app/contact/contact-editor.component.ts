import {Contact} from '../shared/entities/contact.model';
import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'contact-editor.component.html'
})
export class ContactEditorComponent {

  editing = false;
  contact: Contact = new Contact();


  constructor(private service: DeveloperService, private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    console.info(activeRoute.snapshot.parent.params['reference']);
    if (this.editing) {
      service.getDeveloperContact(activeRoute.snapshot.parent.params['reference']).subscribe(response => this.contact = response);
      console.info(this.contact.email1);
    }

  }

  save(form: NgForm) {

    if (this.editing) {
      console.info(this.contact);
      this.service.updateDeveloperContact(this.contact, this.contact.developerReference).
        subscribe(response => console.info(response.developerReference));

    }

    //    this.router.navigateByUrl('/developer');
  }
}
