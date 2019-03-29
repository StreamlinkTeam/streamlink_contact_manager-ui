import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProjectService} from '../shared/services/project.service';
import {ProjectInformation} from '../shared/entities/project.model';

@Component({
  selector: 'app-project-info',
  moduleId: module.id,
  templateUrl: 'project-info-editor.component.html'
})
export class ProjectInfoEditorComponent {

  editing = false;
  projectInfo: ProjectInformation = new ProjectInformation();


  constructor(private service: ProjectService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';


    if (this.editing) {
      service.getProjectInformation(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.projectInfo = response
          ,
          error =>
            this.router.navigate(['projects', 'error']));
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateProjectInformation(this.projectInfo, this.projectInfo.projectReference)
          .subscribe(response => {

            this.projectInfo = response;
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          });
      }
    }
  }
}
