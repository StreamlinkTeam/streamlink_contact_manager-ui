import {Component, OnInit} from '@angular/core';
import {DeveloperService} from '../shared/services/developer.service';
import {AbsenceService} from '../shared/services/absence-service';
import {UserService} from '../shared/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceService} from '../shared/services/resource.service';
import {AbsenceManagerService} from '../shared/services/absence-manager-service';
import {AbsenceManage} from '../shared/entities/absence-manage.model';
import {NgForm} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resource-count-absence',
  moduleId: module.id,
  templateUrl: './resource-count-absence.component.html',
  styleUrls: ['./resource-count-absence.component.css']
})
export class ResourceCountAbsenceComponent implements OnInit {
  absManage: AbsenceManage = new AbsenceManage();
  absenceManageReference;
  resourceReference;
  modifiedDate;
  listAbsence = [];
  CST = 1.83;
  absence = {
    total: 0,
    reel: 0,
    validated: 0,
    notValidated: 0,
    consumed: 0,
    asked: 0,
    prov: 0
  };
  currentResource = false;

  constructor(private developerService: DeveloperService,
              private  service: AbsenceManagerService,
              private resourceService: ResourceService,
              private absenceService: AbsenceService,
              private userService: UserService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {


      this.resourceReference = this.activeRoute.snapshot.parent.params['reference'] ;

      if ( this.resourceReference === undefined && this.activeRoute.snapshot.parent.url[1].toString() === 'profile') {
        this.resourceReference = sessionStorage['ref'];
        this.currentResource = true;

      }

      this.resourceService.getResource(this.resourceReference)
      .subscribe(response => {


        this.service.getAbsenceManageByResource(response.reference).subscribe(res => {
          console.log(res);
        });

        this.service.getAbsenceManageByResource(response.reference).subscribe(res => {
          const start = res.createdDate;
          const today = new Date();
          const lastDayOfYear = new Date(today.getFullYear(), 11, 30);
          console.log('user :: ', res);
          this.absence.total = this.monthDiff(new Date(), new Date(start)) * this.CST + res.acquired;
          const userReference = sessionStorage['ref'];

          this.absenceService.getAllResourceAbsence(response.reference).subscribe(absences => {
            absences.map(item => {
              console.log(item);
              if (item.state === 'NV') {
                const dt = new Date(item.dateAbsence);
                if (today.getMonth() <= dt.getMonth() && today.getFullYear() <= dt.getFullYear()) {
                  this.absence.asked += item.duration;
                }
                this.absence.validated += item.duration;
              } else {
                this.absence.consumed += item.duration;
              }
            });


            this.absence.reel = this.absence.total - this.absence.consumed;
            this.absence.prov = this.absence.reel - this.absence.asked;
          });
          // this.absManage.acquired = this.absence.total;
          // this.absManage.consumed = this.absence.consumed;
          // this.absManage.requested = this.absence.asked;
          // this.absManage.provisional_Balance = this.absence.prov;
          // this.absManage.actual_Balance = this.absence.total;

        });
        this.service.getAbsenceManageByResource(response.reference).subscribe(res => {
          console.log(res);
          const start = res.createdDate;
          this.absManage = res;
          this.absManage.acquired = this.monthDiff(new Date(), new Date(start)) * this.CST + res.acquired;

          this.absenceManageReference = res.reference;
          this.resourceReference = response.reference;

        });

      });
  }

  private monthDiff(d2, d1) {
    console.log(d1);
    console.log(d2);
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }


  save(form: NgForm) {
    this.service.updateAbsenceManage(this.absManage, this.resourceReference)
      .subscribe(
        response => {
          this.absManage = response;
          Swal.fire(
            'Mise à jour!',
            'Données Mise à jour avec succés',
            'success'
          );
        }, error => {
          alert('Erreur lors de la mise à jour des donnés');
        }
      );
  }

  // create(form: NgForm) {
  //   const abs: AbsenceManage = new AbsenceManage();
  //
  //   this.service.createAbsence(abs, 'resZbYlOPm1v5mRRmH')
  //     .subscribe(response => {
  //       console.log(response);
  //       Swal.fire(
  //         'Créer!',
  //         'Absence créer avec succés',
  //         'success'
  //       );
  //     }, error => {
  //       alert('Erreur lors de la mise à jour des donnés');
  //     });
  // }
}
