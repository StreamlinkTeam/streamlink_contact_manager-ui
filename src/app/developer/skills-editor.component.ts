import {Contact} from '../shared/entities/contact.model';
import {Developer} from '../shared/entities/developer.model';
import {Language} from '../shared/entities/language.model';
import {SkillsInformation} from '../shared/entities/skills-information.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {LanguageService} from '../shared/services/language.service';
import {UserService} from '../shared/services/user.service';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  moduleId: module.id,
  templateUrl: 'skills-editor.component.html'
})
export class SkillsEditorComponent implements OnInit {

  editing = false;
  skills: SkillsInformation = new SkillsInformation();
  languages$: Observable<Language[]>;
  experiences: any[];
  formations: any[];



  constructor(private service: DeveloperService, private languageService: LanguageService, private router: Router,
    private activeRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';

    this.languages$ = this.languageService.getLanguages();

    this.experiences = [
      {label: 'Non défini', value: 'NON'},
      {label: 'Entre 1 et 2 ans', value: 'BETWEEN1AND2'},
      {label: 'Entre 3 et 5 ans', value: 'BETWEEN3AND5'},
      {label: 'Entre 6 et 10 ans', value: 'BETWEEN6ND10'},
      {label: 'Plus que 10 ans', value: 'MORE_THAN_10'}];

    this.formations = [
      {label: 'Non défini', value: 'NOT_DEFINED'},
      {label: 'Bac', value: 'BAC'},
      {label: 'Bac +2', value: 'BAC_PLUS_2'},
      {label: 'Bac +3', value: 'BAC_PLUS_3'},
      {label: 'Bac +4', value: 'BAC_PLUS_4'},
      {label: 'Bac +5', value: 'BAC_PLUS_5'},
      {label: 'Bac +6', value: 'BAC_PLUS_6'},
      {label: 'Bac +7', value: 'BAC_PLUS_7'},
      {label: 'Bac +8', value: 'BAC_PLUS_8'}];


    if (this.editing) {
      this.service.getDeveloperSkills(this.activeRoute.snapshot.parent.params['reference']).subscribe(response => this.skills = response);
      console.info(this.skills.title);
    }
  }

  addQualifications(diplome: HTMLInputElement) {
    this.skills.qualifications.push(diplome.value);
    diplome.value = '';
  }

  removeQualification(i: number) {
    this.skills.qualifications.splice(i, 1);
  }

  save(form: NgForm) {

    if (this.editing) {
      console.info(this.skills);
      this.service.updateDeveloperSkills(this.skills, this.skills.developerReference).
        subscribe(response => console.info(response.developerReference));
    }

    //    this.router.navigateByUrl('/developer');
  }
}
