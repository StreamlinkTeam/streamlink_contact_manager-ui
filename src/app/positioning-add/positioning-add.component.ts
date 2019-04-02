import {NeedService} from './../shared/services/need.service';
import {Component, OnInit} from '@angular/core';
import {Positioning} from '../shared/entities/positioning.model';
import {NgForm} from '@angular/forms';
import {PositioningService} from '../shared/services/positioning.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Router} from '@angular/router';
import {Resource, ResourceView} from '../shared/entities/resource.model';
import {ResourceService} from '../shared/services/resource.service';
import {ProjectService} from '../shared/services/project.service';
import {UserService} from '../shared/services/user.service';
import {User} from '../shared/entities/user.model';
import Swal from 'sweetalert2';
import {MatDialogRef} from '@angular/material';

//import * as swal from 'sweetalert2';


@Component({
  selector: 'app-positioning-add',
  templateUrl: './positioning-add.component.html',
  styleUrls: ['./positioning-add.component.css']
})
export class PositioningAddComponent implements OnInit {
  editing = false;

  positioning: Positioning = new Positioning;
  positionings: Positioning [];
  users: User[];


  // positioningForm: FormGroup;
  stages: any[];
  resources$: Observable<ResourceView[] | Resource[]>;

  resources: any = [];
  projects: any = [];
  besoins: any = [];


  resourcesLoading = false;
  resourcesInput$ = new Subject<string>();


  constructor(
    private service: PositioningService,
    private resourceService: ResourceService,
    private projectService: ProjectService,
    private needService: NeedService,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<PositioningAddComponent>
    /* private toastr: ToastrService */) {
    /*  console.log(activeRoute.snapshot.parent.params);

   this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';

   if (this.editing) {
     service.getPositioning(activeRoute.snapshot.parent.params['reference'])
       .subscribe(response => this.positioning = response
         ,
         error =>
           this.router.navigate(['projects', 'error']));
   } */

  }


  ngOnInit() {

    this.userService.getUsers().subscribe(response => this.users = response);


    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'Non definie', value: 'NOT_DEFINED'},
      {label: 'En attente', value: 'Waiting'},
      {label: 'Présenter au client', value: 'PresentedToClient'},
      {label: 'Envoye CV', value: 'SendingCV'},
      {label: 'Rejeter', value: 'Rejected'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Positionné', value: 'Positioned'}];

    this.resourceService.getResources().subscribe(res => {
      let ress: any[];
      ress = res;
      ress.map((i) => {
        i.fullName = i.firstname + ' ' + i.lastname;
        return i;
      });
      this.resources = ress;
    });

    this.projectService.getProjects().subscribe(res => {

      this.projects = res;
    });

    this.needService.getNeeds().subscribe(res => {
      this.besoins = res;
    });


    // this.loadResources(this.positioning.resourceReference);


  }

  /*   private loadResources(resourceReference: string) {

        this.resourceService.getResource(resourceReference).subscribe(response => {
            this.resources$ = concat(
              of([response]), // default items
              this.resourcesInput$.pipe(
                debounceTime(200),
                distinctUntilChanged(),
                tap(() => this.resourcesLoading = true),
                switchMap(term => this.resourceService.searchResources(term).pipe(
                  catchError(() => of([])), // empty list on error
                  tap(() => this.resourcesLoading = false)
                ))
              )
            );

          }, error => {
            console.log(error);

          }
        );

    } */

  save(form: NgForm) {
    /* if (form.valid) {
       if (this.editing) {
         this.service.updatePositioning(this.positioning, this.positioning.reference)
         .subscribe(
           response => {

             this.positioning = response;
             this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

           }, error => {
             this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
           }
         );

     } else { */
    this.positioning.createdDate = new Date();
    this.positioning.modifiedDate = new Date();

    this.service.createPositionings(this.positioning)
      .subscribe(
        response => {
          this.dialogRef.close();
          Swal.fire('Positionnement crée avec succés', 'Opération Réussite!', 'success');
          this.router.navigateByUrl('/positionings');
          console.log(response);
        }, err => {
          Swal.fire('Erreur de création du positionnement', 'Opération Echouée!', 'error');

        });

  }

  onClose() {
    this.dialogRef.close();
  }

}

//  }

// }


