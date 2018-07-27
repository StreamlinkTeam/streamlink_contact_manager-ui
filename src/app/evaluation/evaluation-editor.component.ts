import {Evaluation} from '../shared/entities/evaluation.model';
import {Contact} from '../shared/entities/contact.model';
import {Developer} from '../shared/entities/developer.model';
import {User} from '../shared/entities/user.model';
import {DeveloperService} from '../shared/services/developer.service';
import {EvaluationService} from '../shared/services/evaluation.service';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: 'evaluation-editor.component.html'
})
export class EvaluationEditorComponent {

  editing = false;
  evaluation: Evaluation = new Evaluation();
  reference: string;

  evaluations: Evaluation[];


  constructor(private service: EvaluationService, private router: Router,
    activeRoute: ActivatedRoute) {

    this.reference = activeRoute.snapshot.parent.params['reference'];
    this.service.getEvaluations(this.reference).subscribe(response => this.evaluations = response);



  }

  showEvaluation(index: number) {

    this.evaluation = Object.assign({}, this.evaluations[index]);
    this.editing = true;

  }

  newEvaluation() {

    this.evaluation = new Evaluation();
    this.editing = false;
  }




  deleteEvaluation(index: number) {

    if (confirm('Suppression de l\'Evaluation')) {
      const act = this.evaluations[index];

      if (act.reference === this.evaluation.reference) {
        this.evaluation = new Evaluation();
        this.editing = false;
      }


      this.service.deleteEvaluation(act.reference, this.reference).
        subscribe(response => {
          console.info(response);
          this.evaluations.splice(index, 1);
        });
    }

  }

  save(form: NgForm) {

    console.info(this.evaluation);

    if (this.editing) {

      this.service.updateEvaluation(this.evaluation, this.evaluation.reference, this.reference).
        subscribe(response => {
          this.service.getEvaluations(this.reference).subscribe(res => this.evaluations = res);
          this.evaluation = new Evaluation();
          this.editing = false;

        });
    } else {
      this.service.createEvaluation(this.evaluation, this.reference).
        subscribe(response => {
          this.service.getEvaluations(this.reference).subscribe(res => this.evaluations = res);
          this.evaluation = new Evaluation();
          this.editing = false;

        });
    }

  }
}
