import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../shared/services/commande.service';
import { ProductionService } from '../../shared/services/production.service';
import { CalendarService } from '../../calendar/calendar.service';
import { DeveloperService } from '../../shared/services/developer.service';
import { UserService } from '../../shared/services/user.service';
import { BillService } from '../../shared/services/bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-production-monthly',
  templateUrl: './production-monthly.component.html',
  styleUrls: ['./production-monthly.component.css']
})
export class ProductionMonthlyComponent implements OnInit {
  heads = ['Projet', 'Client', 'Ressource', 'Commande', 'Date', 'Prod', 'CA de Production', 'Production', 'Action'];
  today = new Date();
  groupedMonths = {};
  constructor(private productionService: ProductionService,
    private timeLineService: CalendarService,
    private developerService: DeveloperService,
    private factureService: BillService,
    private router: Router) { }
  production = [];
  months = [];

  ngOnInit() {
    let array = [];
    this.timeLineService.groupedByDay().subscribe(res => {
      let data = [];
      data = res as [];
      data.map(e => {
        if (!this.groupedMonths[e.year]) this.groupedMonths[e.year] = {};
        if (!this.groupedMonths[e.year][e.month]) this.groupedMonths[e.year][e.month] = {};
        this.groupedMonths[e.year][e.month][e.id] = e.total;
      });
      console.log(this.groupedMonths)
      this.productionService.getAll().subscribe(res => {
        this.production = res as [];

        for (let i = 0; i < this.production.length; i++) {
          this.production[i].ca = this.production[i].caht - (this.production[i].prod * this.production[i].user.personalInformation.tjm);
          this.production[i].date = this.production[i].commande.date;
          let date = new Date(this.production[i].date);
          const numberOfMonths = this.diffMonths(this.today, date);

          for (let j = 0; j < numberOfMonths; j++) {

            date.setDate(1);
            date.setMonth(date.getMonth() + j);
            let tot = this.groupedMonths[date.getFullYear()][date.getMonth() + 1][this.production[i].user.id]
            this.months.push({
              start: this.customDateFormat(date),
              end: this.getLastDayOfMonth(date),
              production: this.production[i],
              totalDays: tot,
              ca: tot * this.production[i].user.personalInformation.tjm
            });
          }
        }

        console.log(this.months);
      });
    });

  }

  customDateFormat(dt) {
    return `${dt.getMonth() + 1}-${dt.getFullYear()}`;
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
    let date = new Date();
    date.setDate(27);
    date.setMonth(prod.start.getMonth());
    date.setFullYear(prod.getFullYear());
    const bill = {
      billDate: date,
      currenvy: 'EUR',
      discountRate: 0,
      tva: 18,
      resource: prod.user,
      projectPos: prod.project,
      commande: prod.commande,
      client: prod.client,
      unitPrice: prod.ca,
      quantity: prod.prod
    };
    this.factureService.createBill(bill).subscribe(res => {
      console.log(res);
    });
  }

  detail(commande) {
    this.router.navigate(['/bills'], { state: { data: { commande: commande.id } } });
  }

}

