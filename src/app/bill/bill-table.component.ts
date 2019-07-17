import {Component, OnInit} from '@angular/core';
import {ServerDataSource} from 'ng2-smart-table';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {Router} from '@angular/router';


@Component({
  selector: 'app-bill-table',
  templateUrl: './bill-table.component.html',
  styleUrls: ['./bill-table.component.css']
})
export class BillTableComponent implements OnInit {

  source: ServerDataSource;

  url: string;

  settings = {
    attr: {
      class: 'table table-striped'
    },
    edit: {
      editButtonContent: '<a class="btn btn-info" title="Modifier ou consulter"><i class="fa fa-pencil-square-o"></i></a>&nbsp'
    },
    delete: {
      deleteButtonContent: '<a class="btn btn-danger" title="Supprimer"><i class="fa fa-trash-o"></i></a>'
    },
    noDataMessage: 'Pas de valeur disponible !',
    actions: {
      columnTitle: '',
      add: false,
      position: 'right'
    },
    mode: 'external',
    columns: {
      createdDate: {
        title: 'Date de création',
        filter: false,
      },
      projectName: {
        title: 'Projet',
        filter: false,
      },
      resourceFullName: {
        title: 'Resource',
        filter: false,
      },
      societyName: {
        title: 'Societe',
        filter: false,
      },
      state: {
        title: 'Status',
        filter: false,
      },
      title: {
        title: 'Titre',
        filter: false,
        // sort: false
      },
      quantity: {
        title: 'Quantité',
        filter: false,
        // sort: false
      },
      unitPrice: {
        title: 'Tarif HT',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
        // sort: false
      },
      tva: {
        title: 'TVA',
        filter: false,
        valuePrepareFunction: (value) => {
          if (value == null) {
            return 'Indéterminée';
          }
          return value + ' %';
        }
        //  sort: false
      },
      total: {
        title: 'Montant HT',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
        // sort: false
      },
      totalTtc: {
        title: 'Montant TTC',
        filter: false,
        valuePrepareFunction: (value) => {
          return value + ' €';
        }
      },
    },
    pager: {
      perPage: 7
    },
  };

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.url = environment.API + '/ws/bills/search?fromAngular=true';

    this.source = new ServerDataSource(this.http,
      {
        endPoint: this.url,
        dataKey: 'content',
        totalKey: 'totalElements',
        pagerLimitKey: 'size',
        perPage: 'size',
        sortFieldKey: 'sort',
        sortDirKey: 'dir',
        pagerPageKey: 'page'
      });
  }

  showBill(rowData: Row) {
    const bill = rowData.getData();
    this.router.navigate(['/bills/edit', bill.reference]);
     console.log(bill);
  }



}
