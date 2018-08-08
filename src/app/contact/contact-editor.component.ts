import {Contact} from '../shared/entities/contact.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'contact-editor.component.html'
})
export class ContactEditorComponent {

  contact: Contact = new Contact();


  constructor(private service: DeveloperService, private router: Router, private toastr: ToastrService,
              private activeRoute: ActivatedRoute) {

    console.info(activeRoute.snapshot.parent.params['reference']);
    service.getDeveloperContact(activeRoute.snapshot.parent.params['reference'])
      .subscribe(response => this.contact = response
        , error => {
          this.router.navigate(['/developers', 'error']);
        });
    console.info(this.contact.email1);


  }

  save(form: NgForm) {


    if (form.valid) {

      this.service.updateDeveloperContact(this.contact, this.contact.developerReference)
        .subscribe(response => {

          this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
          this.contact = response;

        }, error => {
          this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
        });

    }
  }
}
