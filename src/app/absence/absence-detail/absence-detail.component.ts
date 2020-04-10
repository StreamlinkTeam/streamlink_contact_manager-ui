import {Component, OnInit} from '@angular/core';
import {AbsenceService} from '../../shared/services/absence-service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {CalendarService} from '../../calendar/calendar.service';

@Component({
  selector: 'app-absence-detail',
  templateUrl: './absence-detail.component.html',
  styleUrls: ['./absence-detail.component.css']
})
export class AbsenceDetailComponent implements OnInit {
  absences = [];
  list = [];
  total;
  constructor(private absenceService: AbsenceService, private timelineService: CalendarService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      let reference = event.reference;
      this.absenceService.getAllAbsenceByListRef(reference).subscribe(res => {
        console.log(res);
        this.absences = res as [];
      });
    });
  }

  validateAbsence(absence) {
    this.absenceService.validateAbsence(absence).subscribe(res => {
      Swal.fire(
        'Absence Validé!',
        '',
        'success'
      );
      this.router.navigate(['/absence/validation']);
    });

    // ********************************
    this.timelineService.getAllOfEvents().subscribe(res => {
      let results = [];
      results = this.groupe(res) as [];
      console.log(results);
      for (let r in results) {
        for (let x in results[r]) {
          this.list.push(results[r][x]);
        }
      }
      // *****************************
      this.list.map(value => {
        this.total = value.nbr - 1;
      });
      // *****************************
    });

  }


  groupe(res) {
    let results = [];
    results = res as [];
    let obj = {};
    for (let i = 0; i < results.length; i++) {
      const date = new Date(results[i].start);

      if (obj[results[i].resource.id]) {
        if (obj[results[i].resource.id][(date.getMonth() + 1) + '-' + date.getFullYear()]) {
          obj[results[i].resource.id][(date.getMonth() + 1) + '-' + date.getFullYear()].nbr += results[i].timeWork;
        } else {
          obj[results[i].resource.id][(date.getMonth() + 1) + '-' + date.getFullYear()] = {
            nbr: results[i].timeWork,
            month: (date.getMonth() + 1) + '-' + date.getFullYear(),
            fullname: results[i].resource.firstname + ' ' + results[i].resource.lastname,
            timeline: results[i]
          };
        }
      } else {
        obj[results[i].resource.id] = {};
        obj[results[i].resource.id][(date.getMonth() + 1) + '-' + date.getFullYear()] = {
          nbr: results[i].timeWork,
          month: (date.getMonth() + 1) + '-' + date.getFullYear(),
          fullname: results[i].resource.firstname + ' ' + results[i].resource.lastname,
          timeline: results[i]
        };

      }
    }

    return obj;
  }
}
