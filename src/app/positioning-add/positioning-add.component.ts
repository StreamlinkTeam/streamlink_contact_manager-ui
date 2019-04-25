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
    public dialogRef: MatDialogRef<PositioningAddComponent>) {
  }


  ngOnInit() {

    this.userService.getUsers().subscribe(response => this.users = response);


    this.stages = [
      // {label: 'Tous', value: ''},
      {label: 'Positionné', value: 'Positioned'},
      {label: 'Envoye CV', value: 'SendingCV'},
      {label: 'Présenter au client', value: 'PresentedToClient'},
      {label: 'Rejeter', value: 'Rejected'},
      {label: 'Gagné', value: 'Won'},
    ];

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
      let ress: any[];
      ress = res;
      ress.map((i) => {
        i.full = i.reference + ' : ' + i.title;
        return i;
      });
      this.besoins = ress;
    });
  }


  save(form: NgForm) {

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


