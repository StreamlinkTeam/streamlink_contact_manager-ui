import {User} from '../shared/entities/user.model';
import {UserService} from '../shared/services/user.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Project} from '../shared/entities/project.model';
import {ProjectService} from '../shared/services/project.service';

import {distinctUntilChanged, debounceTime, switchMap, tap, catchError} from 'rxjs/operators';

import {Society, SocietyView} from '../shared/entities/society.model';
import {SocietyService} from '../shared/services/society.service';
import {SocietyContactService} from '../shared/services/society-contact.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {of} from 'rxjs/observable/of';
import {concat} from 'rxjs/observable/concat';
import {SocietyContactView} from '../shared/entities/society-contact.model';

@Component({
  moduleId: module.id,
  templateUrl: 'project-editor.component.html'
})
export class ProjectEditorComponent implements OnInit {

  editing = false;
  project: Project = new Project();
  users: User[];

  stages: any[];
  types: any[];

  societies$: Observable<SocietyView[] | Society[]>;
  contacts$: Observable<SocietyContactView[]>;

  societiesLoading = false;
  societiesInput$ = new Subject<string>();

  // selectedPersons: Person[] = <any>[{ name: 'Karyn Wright' }, { name: 'Other' }];


  constructor(private service: ProjectService,
              private societyService: SocietyService,
              private societyContactService: SocietyContactService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.parent.params['reference'] !== undefined;

    this.userService.getUsers().subscribe(response => this.users = response);

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
      this.service.getProject(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
            this.project = response;
            this.contacts$ = this.societyContactService.getSocietyContacts(this.project.societyReference);
            this.loadSocieties(this.project.societyReference);
          }
          , error =>
            this.router.navigate(['/projects', 'error']));
    } else {
      this.loadSocieties(null);
    }
  }

  private loadSocieties(societyReference: string) {

    if (societyReference !== null) {

      this.societyService.getSociety(societyReference).subscribe(response => {
          this.societies$ = concat(
            of([response]), // default items
            this.societiesInput$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => this.societiesLoading = true),
              switchMap(term => this.societyService.searchSocieties(term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.societiesLoading = false)
              ))
            )
          );
        }, error => {
          this.societies$ = concat(
            of([]), // default items
            this.societiesInput$.pipe(
              debounceTime(200),
              distinctUntilChanged(),
              tap(() => this.societiesLoading = true),
              switchMap(term => this.societyService.searchSocieties(term).pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.societiesLoading = false)
              ))
            )
          );
        }
      );
    } else {
      this.societies$ = concat(
        of([]), // default items
        this.societiesInput$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap(() => this.societiesLoading = true),
          switchMap(term => this.societyService.searchSocieties(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => this.societiesLoading = false)
          ))
        )
      );
    }
  }

  onSocietyChange($event) {
    if ($event !== undefined) {
      this.contacts$ = this.societyContactService.getSocietyContacts($event.reference);
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
