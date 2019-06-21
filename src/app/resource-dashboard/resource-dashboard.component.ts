import {Component, OnInit} from '@angular/core';
import {PositioningService} from '../shared/services/positioning.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-resource-dashboard',
  templateUrl: './resource-dashboard.component.html',
  styleUrls: ['./resource-dashboard.component.css']
})
export class ResourceDashboardComponent implements OnInit {

  test;
  headElements = ['project title', 'Client', 'Start Date', 'End Date'];
  Positioning: any = [];
  constructor(private service: PositioningService,
              // private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private dialog: MatDialog) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      // this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {
    this.loadPosistionning();
  }

  loadPosistionning() {
    return this.service.getPositioningsRsource().subscribe((data: {}) => {
      this.Positioning = data;

    });
  }


}
