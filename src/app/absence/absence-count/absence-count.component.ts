import {Component, OnInit} from '@angular/core';
import {DeveloperService} from '../../shared/services/developer.service';
import {AbsenceService} from '../../shared/services/AbsenceService';
import {UserService} from '../../shared/services/user.service';

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
    validated: 0,
    notValidated: 0,
    consumed: 0,
    asked : 0
  };

  constructor(private developerService: DeveloperService,
              private  absenceService: AbsenceService,
              private userService: UserService) {
  }





  ngOnInit() {
    this.developerService.getDeveloperByEmail(sessionStorage.getItem('username')).subscribe(res => {
      const start = res.createdDate;
      const today = new Date();
      this.absence.total = this.monthDiff(new Date(), new Date(start)) * this.CST;
      this.absenceService.getAllAbcense().subscribe(res => {
        res.map(item => {
          if ( item.state === 'NV' ) {
            const dt = new Date(item.dateAbsence);
            if (today.getMonth() <= dt.getMonth() && today.getFullYear() <= dt.getFullYear()) {
              this.absence.asked += item.duration;
            }
            this.absence.validated += item.duration;
          } else {
            this.absence.consumed += item.duration;
          }
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
