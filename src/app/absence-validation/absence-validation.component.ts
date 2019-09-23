import {Component, OnInit, ViewChild} from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {AbsenceService} from '../shared/services/AbsenceService';
import {ToastrService} from 'ngx-toastr';
import {Absence} from '../shared/entities/Absence.model';
import {AbsenceListService} from '../shared/services/AbsenceListService';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-absence-validation',
  templateUrl: './absence-validation.component.html',
  styleUrls: ['./absence-validation.component.css']
})
export class AbsenceValidationComponent implements OnInit {
  absences: Absence[];
  displayedColumns = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<Absence>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private service: AbsenceService,
              private absenceListService: AbsenceListService,
              private toastr: ToastrService,
              private absenceService: AbsenceService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.loadAbsences();
  }



  loadAbsences() {
    return this.absenceListService.getAllAbcenseListByManager().subscribe(data => {
      console.log("ABSENCES :: ", data)
      this.absences = data;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  showAbsence1(rowData: Row) {
    const absenceList = rowData.getData();
    if (absenceList.resource) {
      this.router.navigate(['/validation', absenceList.reference]);
    } else {
      this.router.navigate(['/developers/edit', absenceList.reference]);

    }
    console.log(absenceList.reference);
  }

}






