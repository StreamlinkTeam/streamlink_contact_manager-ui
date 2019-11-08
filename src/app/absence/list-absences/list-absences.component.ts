import { Component, OnInit } from '@angular/core';
import { AbsenceListService } from '../../shared/services/AbsenceListService';
import { ToastrService } from 'ngx-toastr';
import { AbsenceService } from '../../shared/services/AbsenceService';

@Component({
  selector: 'app-list-absences',
  templateUrl: './list-absences.component.html',
  styleUrls: ['./list-absences.component.css']
})
export class ListAbsencesComponent implements OnInit {
  absences: any = [];
  headElements = ['project title', 'Client', 'Start Date', 'End Date'];
  constructor(private service: AbsenceService,
    private toastr: ToastrService,
    private absenceService: AbsenceService) { }

  ngOnInit() {
    let userMail = localStorage.getItem('username');
    console.log(userMail)
    return this.service.getAllAbsenceByUser(userMail).subscribe((data) => {
      this.absences = data as [];
      console.log(this.absences)

    });
  }

}
