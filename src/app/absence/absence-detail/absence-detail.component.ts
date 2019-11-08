import { Component, OnInit } from '@angular/core';
import { AbsenceService } from '../../shared/services/AbsenceService';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-absence-detail',
  templateUrl: './absence-detail.component.html',
  styleUrls: ['./absence-detail.component.css']
})
export class AbsenceDetailComponent implements OnInit {
  absences = [];
  constructor(private absenceService: AbsenceService,
    private route: ActivatedRoute, private router: Router) { }

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
  }

}
