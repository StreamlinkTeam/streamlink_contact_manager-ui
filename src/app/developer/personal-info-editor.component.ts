import {PersonalInformation} from '../shared/entities/personal-information.model';
import {DeveloperService} from '../shared/services/developer.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-personal-info',
  moduleId: module.id,
  templateUrl: 'personal-info-editor.component.html'
})
export class PersonalInfoEditorComponent {

  editing = false;
  personalInfo: PersonalInformation = new PersonalInformation();
  familySituations: any[];


  constructor(private service: DeveloperService, private router: Router,
              activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    console.info(activeRoute.snapshot.parent.params['reference']);
    if (this.editing) {
      service.getDeveloperInfo(activeRoute.snapshot.parent.params['reference']).subscribe(response => this.personalInfo = response);
      console.info(this.personalInfo.birthDate);
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
        console.info(this.personalInfo);
        this.service.updateDeveloperInfo(this.personalInfo, this.personalInfo.developerReference).subscribe(response => {
          console.info(response.developerReference);
          this.personalInfo = response;
        });
      }
    }
    //    this.router.navigateByUrl('/developer');
  }
}
