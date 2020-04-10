import { Component, OnInit } from '@angular/core';
import { DeveloperService } from '../../shared/services/developer.service';
import { AbsenceService } from '../../shared/services/absence-service';
import { UserService } from '../../shared/services/user.service';
import {AbsenceManagerService} from '../../shared/services/absence-manager-service';

@Component({
  selector: 'app-absence-count',
  templateUrl: './absence-count.component.html',
  styleUrls: ['./absence-count.component.css']
})
export class AbsenceCountComponent implements OnInit {
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

  constructor(private developerService: DeveloperService,
    private absenceService: AbsenceService,
              private  service: AbsenceManagerService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.service.getAbsenceManageByResource(res.reference).subscribe(resp => {
        const start = resp.createdDate;
        const today = new Date();
        this.absence.total = this.monthDiff(new Date(), new Date(start)) * this.CST + resp.acquired;

        let lastDayOfYear = new Date(today.getFullYear(), 11, 30);
        this.absenceService.getAllResourceAbsence(res.reference).subscribe(responce => {
          responce.map(item => {
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

}
