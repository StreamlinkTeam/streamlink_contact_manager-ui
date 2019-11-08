import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { CalendarService } from '../calendar/calendar.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  list = [];
  constructor(private timelineService: CalendarService, private router: Router) { }

  ngOnInit() {
    this.timelineService.getAllOfEvents().subscribe(res => {
      let results = [];
      results = this.groupe(res) as [];
      console.log(results)
      for (let r in results) {
        for (let x in results[r]) {
          this.list.push(results[r][x]);
        }
      }
      console.log(this.list)
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

  validateTimeLine(timeline) {
    console.log(timeline)
    this.timelineService.validateTimelines(timeline).subscribe(res => {
      Swal.fire(
        'Time line validé avec succès !',
        '',
        'success'
      );
      this.router.navigate(['/timeline']);
    });
  }
}
