import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-absence-demande',
  templateUrl: './absence-demande.component.html',
  styleUrls: ['./absence-demande.component.css']
})
export class AbsenceDemandeComponent implements OnInit {
  test;
  type;
  duration;
  datesSelected: NgbDateStruct[] = [];
  change(value: NgbDateStruct[]) {
    this.datesSelected = value;
  }
  constructor() { }

  ngOnInit() {}

  addPeriode() {

  }
  removeQualification(i: number) {
    this.datesSelected.splice(i, 1);
  }

  save = form => {};
}
