import {Contact} from '../shared/entities/contact.model';
import {Developer} from '../shared/entities/developer.model';
import {Language} from '../shared/entities/language.model';
import {SkillsInformation} from '../shared/entities/skills-information.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {LanguageService} from '../shared/services/language.service';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  templateUrl: 'skills-editor.component.html'
})
export class SkillsEditorComponent {

  editing = false;
  skills: SkillsInformation = new SkillsInformation();
  languages: Language[];



  constructor(private service: DeveloperService, private languageService: LanguageService, private router: Router,
    activeRoute: ActivatedRoute) {
    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

    languageService.getLanguages().subscribe(response => {
      this.languages = response;
      console.info(response);
      console.info(this.languages);

    });

    if (this.editing) {
      service.getDeveloperSkills(activeRoute.snapshot.parent.params['reference']).subscribe(response => this.skills = response);
      console.info(this.skills.title);
    }

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
