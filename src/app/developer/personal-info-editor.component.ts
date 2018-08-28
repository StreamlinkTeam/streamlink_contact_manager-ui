import {PersonalInformation} from '../shared/entities/personal-information.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-personal-info',
  moduleId: module.id,
  templateUrl: 'personal-info-editor.component.html'
})
export class PersonalInfoEditorComponent {

  editing = false;
  personalInfo: PersonalInformation = new PersonalInformation();
  familySituations: any[];


  constructor(private service: DeveloperService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    if (this.editing) {
      service.getDeveloperInfo(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.personalInfo = response
          ,
          error =>
            this.router.navigate(['/developers', 'error']));
    }

    this.familySituations = [
      {label: 'Célibataire', value: 'SINGLE'},
      {label: 'Marié(e)', value: 'MARRIED'},
      {label: 'Concubinage', value: 'COHABITATION'},
      {label: 'Divorcé(e)', value: 'DIVORCED'},
      {label: 'Veuf(ve)', value: 'WIDOWED'},
      {label: 'PACS', value: 'PACS'}
    ];

  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateDeveloperInfo(this.personalInfo, this.personalInfo.developerReference)
          .subscribe(response => {

            this.personalInfo = response;
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          });
      }
    }
  }
}
