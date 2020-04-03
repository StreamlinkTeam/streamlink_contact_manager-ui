import {Component, OnInit} from '@angular/core';
import {ProductionService} from '../../shared/services/production.service';
import {CalendarService} from '../../calendar/calendar.service';
import {DeveloperService} from '../../shared/services/developer.service';
import {BillService} from '../../shared/services/bill.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-production-monthly',
  templateUrl: './production-monthly.component.html',
  styleUrls: ['./production-monthly.component.css']
})
export class ProductionMonthlyComponent implements OnInit {
  mon = {isActive: true};
  gle = {isActive: false};
  heads = ['Projet', 'Client', 'Ressource', 'Commande', 'Date', 'Prod', 'CA de Production', 'Production', 'Action'];
  today = new Date();
  groupedMonths: object = {};

  constructor(private productionService: ProductionService,
              private timeLineService: CalendarService,
              private developerService: DeveloperService,
              private factureService: BillService,
              private router: Router) {
  }

  showSpinner = true;
  production: any = [];
  months = [];
  filterargs = {};

  ngOnInit() {
    let array = [];
    this.timeLineService.groupedByDay().subscribe(res => {
      let data = [];
      data = res as [];
      data.map(e => {
        if (!this.groupedMonths[e.year]) {
          this.groupedMonths[e.year] = {};
        }
        if (!this.groupedMonths[e.year][e.month]) {
          this.groupedMonths[e.year][e.month] = {};
        }
        if (!this.groupedMonths[e.year][e.month][e.id]) {
          this.groupedMonths[e.year][e.month][e.id] = {};
        }
        this.groupedMonths[e.year][e.month][e.id][e.project] = e.total;
      });
      this.productionService.getAll().subscribe(res => {
        this.production = res as [];
        for (let i = 0; i < this.production.length; i++) {
          this.production[i].ca = this.production[i].caht - (this.production[i].prod * this.production[i].project.tjm);
          this.production[i].date = this.production[i].commande.date;
          let date = new Date(this.production[i].date);
          const numberOfMonths = this.diffMonths(this.today, date);

          for (let j = 0; j < numberOfMonths; j++) {
            const n: number = Number(date.getMonth()) + +j + +1;
            console.log('[' + date.getFullYear() + '][' + n + '][' + this.production[i].user.id + '][' + this.production[i].project.reference + ']');

            // let tot = 0;
            // if (this.groupedMonths[date.getFullYear()][n][this.production[i].user.id][this.production[i].project.reference] !== undefined) {
            let tot = this.groupedMonths[date.getFullYear()][n][this.production[i].user.id][this.production[i].project.reference];
            //  }

            this.months.push({
              found: false,
              date: date,
              start: this.customDateFormat(date),
              end: this.getLastDayOfMonth(date),
              production: this.production[i],
              totalDays: tot,
              ca: tot * this.production[i].project.tjm
            });
            date.setDate(27);
            date.setMonth(n);
            console.log('MONTHS :: ', this.months);
            this.factureService.getAll().subscribe(fa => {
              const factures = fa as [];
              this.months.map(m => {
                console.log(m.production);
                console.log(factures);
                m.found = this.billexist(factures, m.start, m.production);
              });
            });
          }
        }
        this.showSpinner = false;
      });
    });
  }

  billexist(factures, d, production) {
    let found = false;
    const dateString = d.slice(d.indexOf('-') + 1) + '-' + d.slice(0, 2) + '-01';
    const date = new Date(dateString);
    for (let i = 0; i < factures.length; i++) {
      const factureDate = new Date(factures[i].billDate);
      if (factureDate.getMonth() == date.getMonth() &&
        factureDate.getFullYear() == date.getFullYear() &&
        factures[i].resource.id == production.user.id &&
        factures[i].commande.id == production.commande.id) {
        found = true;
        return true;
      }
    }

    return found;
  }

  customDateFormat(dt) {
    let month = dt.getMonth() + 1;
    const customString = `${month}-${dt.getFullYear()}`;
    if (month < 10) {
      return '0' + customString;
    }
    return customString;
  }

  getLastDayOfMonth(d) {
    d.setDate(1);
    d.setMonth(d.getMonth() + 1);
    d.setDate(d.getDate() - 1);
    return d;
  }

  diffMonths(dt2, dt1) {
    dt1 = new Date(dt1);
    const diff = dt2.getMonth() - dt1.getMonth();
    return Math.abs(diff) + 1;
  }

  generate(prod) {
    const production = prod.production;
    let dateString = prod.start.substring(prod.start.indexOf('-') + 1) + '-';
    dateString += prod.start.substring(0, prod.start.indexOf('-'));
    dateString += '-27';
    console.log('DATE STRING :: ', dateString);
    let date = new Date(dateString);
    const bill = {
      billDate: date,
      currenvy: 'EUR',
      discountRate: 0,
      tva: 18,
      resource: production.user,
      projectPos: production.project,
      commande: production.commande,
      client: production.client,
      unitPrice: prod.ca,
      quantity: prod.totalDays
    };
    this.factureService.createBill(bill).subscribe(res => {
      let result: any;
      result = res;
      Swal.fire(
        'Facture ' + bill.billDate.getFullYear() + '00' + result.id + ' généré avec succées !',
        '',
        'success'
      );

      this.router.navigate(['bills']);
    });
  }

  detail(commande) {
    this.router.navigate(['/bills'], {state: {data: {commande: commande.id}}});
  }

}

