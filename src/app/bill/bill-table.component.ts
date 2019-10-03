import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Row } from 'ng2-smart-table/lib/data-set/row';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BillService } from '../shared/services/bill.service';


@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {
  bills = [];
  heads = ['Projet', 'Client', 'Ressource', 'Commande', 'date', 'facture', 'Action'];
  source: any;

  url: string;

  constructor(private factureService: BillService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    //this.url = environment.API + '/ws/bills/search?fromAngular=true';

    console.log(history.state.data)
    this.factureService.getAll().subscribe(res => {
      this.bills = res as [];
      console.log(this.bills);
    });
  }

  showBill(rowData: Row) {
    const bill = rowData.getData();
    this.router.navigate(['/bills/edit', bill.reference]);
    console.log(bill);
  }

  onSelectRow(event: any) {
    if (event.data.resource) {

      this.router.navigate(['/bills/edit', event.data.reference]);
    }
    this.router.navigate(['/bills/edit', event.data.reference]);
  }


}
