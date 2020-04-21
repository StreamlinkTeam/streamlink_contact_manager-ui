import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AbsenceListService } from '../../shared/services/absence-list-service';
import { AbsenceList } from '../../shared/entities/absence-list.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AbsenceService } from '../../shared/services/absence-service';
import { Absence } from '../../shared/entities/absence.model';

@Component({
  selector: 'app-absence-demande',
  templateUrl: './absence-demande.component.html',
  styleUrls: ['./absence-demande.component.css']
})
export class AbsenceDemandeComponent implements OnInit {
  absenceList: AbsenceList = new AbsenceList();
  absence: Absence = new Absence();
  today = new Date();
  refAbs;
  test;
  type;
  duration: any[] = [];
  index;
  datesSelected: NgbDateStruct[] = [];


  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }

  constructor(private service: AbsenceListService,
    private toastr: ToastrService,
    private absenceService: AbsenceService
  ) {
  }

  ngOnInit() { }

  addPeriode() {

  }
  removeQualification(i: number) {
    this.datesSelected.splice(i, 1);
  }

  save(form: NgForm) {
    console.log(this.absenceList);
    this.service.createAbsenceList(this.absenceList).subscribe(res => {
      this.saveAbsence(form, res.reference);
      this.refAbs = res.reference;
      this.toastr.success('Action Mise à jour avec succés', 'Opération Réussite!');

    }, error1 => {
      console.log('error!!!');
      this.toastr.error('Erreur lors de la mise à jour de l\'Action', 'Opération échoué !!!');

    });
  }
  saveAbsence(form: NgForm, reference) {
    const index = this.datesSelected;
    const ref = reference;
    for (let i = 0; i < index.length; i++) {
      this.absence.type = this.type;
      this.absence.state = 'NV';
      this.absence.dateAbsence = new Date(this.datesSelected[i].month + '-' + this.datesSelected[i].day + '-' + this.datesSelected[i].year);
      this.absence.dateAbsence.setDate(this.absence.dateAbsence.getDate() + 1);
      this.absence.duration = this.duration[i];
      this.absence.absenceListReference = reference;

      console.log(this.absence);
      this.absenceService.createAbsence(this.absence).subscribe(res => {

        this.refAbs = res.reference;

      }, error1 => {
        this.toastr.error('Erreur lors de l\'insertion de l\'absence', 'Opération échoué !!!');

      });
    }
  }

  log(ev, i: number) {
    this.duration[i] = ev.value;
    console.log(this.duration);
  }
}
