import { Component, OnInit } from '@angular/core';
import { AbsenceListService } from '../../shared/services/absence-list-service';
import { ToastrService } from 'ngx-toastr';
import { AbsenceService } from '../../shared/services/absence-service';

@Component({
  selector: 'app-list-absences',
  templateUrl: './list-absences.component.html',
  styleUrls: ['./list-absences.component.css']
})
export class ListAbsencesComponent implements OnInit {
  absences: any = [];
  headElements = ['project title', 'Client', 'Start Date', 'End Date'];
  constructor(private service: AbsenceService) { }

  ngOnInit() {
    const userReference = sessionStorage['ref'];
    console.log(userReference);
    return this.service.getAllResourceAbsence(userReference).subscribe((data) => {
      this.absences = data as [];
      console.log(this.absences);

    });
  }

}
