import {Contact} from '../shared/entities/contact.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {SocietyService} from '../shared/services/society.service';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'contact-editor.component.html'
})
export class ContactEditorComponent {

  contact: Contact = new Contact();
  isDeveloper = true;


  constructor(private developerService: DeveloperService,
              private societyService: SocietyService,
              private router: Router,
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute) {

    console.info(activeRoute.snapshot.parent.params['reference']);
    console.info(activeRoute.snapshot.parent.url[0].toString());
    this.isDeveloper = activeRoute.snapshot.parent.url[0].toString() === 'developer';

    if (this.isDeveloper) {
      this.developerService.getDeveloperContact(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/developers', 'error']);
          });
    } else {
      this.societyService.getSocietyContact(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.contact = response
          , error => {
            this.router.navigate(['/societies', 'error']);
          });
    }
    console.info(this.contact.email1);


  }

  save(form: NgForm) {


    if (form.valid) {

      if (this.isDeveloper) {
        this.developerService.updateDeveloperContact(this.contact, this.contact.ownerReference)
          .subscribe(response => {

            this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
          });
      } else {
        this.societyService.updateSocietyContact(this.contact, this.contact.ownerReference)
          .subscribe(response => {

            this.toastr.success('Contact Mis à jour avec succés', 'Opération Réussite!');
            this.contact = response;

          }, error => {
            this.toastr.error('Erreur lors de la Mise à jour du contact', 'Opération échoué !!!');
          });
      }

    }
  }
}
