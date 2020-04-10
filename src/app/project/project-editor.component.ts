import { UserService } from '../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Form, NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../shared/services/project.service';
import { ProjectPos } from '../shared/entities/project-pos.model';
import { ResourceService } from '../shared/services/resource.service';
import { NeedService } from '../shared/services/need.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import { SocietyContactService } from '../shared/services/society-contact.service';

@Component({
  moduleId: module.id,
  templateUrl: 'project-editor.component.html'
})
export class ProjectEditorComponent implements OnInit {

  editing = false;

  projectPos: any = {};

  users: any[];
  stages: any[];
  needs: any = [];
  resources: any = [];

  resource: any;
  responsable: any;
  societyContact: any;

  resourcesLoading = false;
  resourcesInput$ = new Subject<string>();
  contacts: any = [];

  // projectInfo: ProjectInformation = new ProjectInformation();


  constructor(private projectService: ProjectService,
    private resourceService: ResourceService,
    private needService: NeedService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private activeRoute: ActivatedRoute,
    private societyContactService: SocietyContactService) {

    // this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';


  }

  ngOnInit(): void {
    this.societyContactService.getAllSocietyContact().subscribe(res =>
      this.contacts = res);

    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });

    this.needService.getNeeds().subscribe(res => {
      this.needs = res;
    });

    this.stages = [
      { label: 'Tous', value: '' },
      { label: 'Non definie', value: 'NOT_DEFINED' },
      { label: 'En attente', value: 'Waiting' },
      { label: 'Présenter au client', value: 'PresentedToClient' },
      { label: 'Envoye CV', value: 'SendingCV' },
      { label: 'Rejeter', value: 'Rejected' },
      { label: 'Gagné', value: 'Won' },
      { label: 'Positionné', value: 'Positioned' }];

    const ref = this.route.snapshot.params.reference;

    this.resourceService.getResources().subscribe(res => {
      console.log(res);
      let ress;
      ress = res;
      ress.map((i) => {
        i.fullName = i.firstname + ' ' + i.lastname;
        return i;
      });
      this.resources = ress;
    });
  }

  createProject(form: NgForm) {

    this.projectPos.createdDate = moment(this.projectPos.createdDate).toDate();
    this.projectPos.presentationDate = moment(this.projectPos.presentationDate).toDate();
    this.projectPos.endDate = moment(this.projectPos.endDate).toDate();
    this.projectPos.societyName = 'Streamlink';
    this.projectPos.resource.mobility = '';
    console.log(this.projectPos);

    this.projectService.createRealProject(this.projectPos)
      .subscribe(res => {

        this.toastr.success('Projet ajouté avec succés', 'Opération Réussite!');
        this.router.navigateByUrl('/projects');

      }, error => {
        console.log(error);
        this.toastr.error('Erreur !! ', 'Opération échoué !!!');
      });
  }

}

