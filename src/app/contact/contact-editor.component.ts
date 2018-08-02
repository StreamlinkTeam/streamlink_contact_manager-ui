import {Contact} from '../shared/entities/contact.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'contact-editor.component.html'
})
export class ContactEditorComponent {

  contact: Contact = new Contact();


  constructor(private service: DeveloperService, private router: Router,
              activeRoute: ActivatedRoute) {

    console.info(activeRoute.snapshot.parent.params['reference']);
    service.getDeveloperContact(activeRoute.snapshot.parent.params['reference'])
      .subscribe(response => this.contact = response);
    console.info(this.contact.email1);


  }

  save(form: NgForm) {


    if (form.valid) {
      console.info(this.contact);
      this.service.updateDeveloperContact(this.contact, this.contact.developerReference)
        .subscribe(response => this.contact = response);

    }
  }
}
