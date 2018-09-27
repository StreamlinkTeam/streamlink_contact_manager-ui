import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Project} from '../shared/entities/project.model';
import {ProjectService} from '../shared/services/project.service';

@Component({
  moduleId: module.id,
  templateUrl: 'project-editor.component.html'
})
export class ProjectEditorComponent {

  editing = false;
  project: Project = new Project();
  users: User[];

  stages: any[];
  types: any[];


  constructor(private service: ProjectService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['reference'] !== undefined;

    userService.getUsers().subscribe(response => this.users = response);

    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'En cours', value: 'InProgress'},
      {label: 'Reporté', value: 'Postponed'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Perdu', value: 'Lost'},
      {label: 'Abandonné', value: 'Abandoned'}];

    this.types = [
      {label: 'Tous', value: ''},
      {label: 'Régie', value: 'Authority'},
      {label: 'Forfait', value: 'FlatRate'},
      {label: 'Projet interne', value: 'InternalProject'},
      {label: 'Produit', value: 'Product'},
      {label: 'Recrutement', value: 'Recruitment'}];

    if (this.editing) {
      service.getProject(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.project = response
          , error =>
            this.router.navigate(['/projects', 'error']));
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateProject(this.project, this.project.reference)
          .subscribe(
            response => {

              this.project = response;
              this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

            }, error => {
              this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
            }
          );

      } else {
        this.service.createProjects(this.project)
          .subscribe(response => {

            this.toastr.success('Projet Créé avec succés', 'Opération Réussite!');
            this.router.navigate(['/projects/edit/', response.reference]);

          }, error => {
            this.toastr.error('Erreur lors de la création du Projet', 'Opération échoué !!!');
          });
      }
    }
  }
}
