import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../shared/services/commande.service';
import { ProductionService } from '../../shared/services/production.service';
import { CalendarService } from '../../calendar/calendar.service';
import { DeveloperService } from '../../shared/services/developer.service';
import { UserService } from '../../shared/services/user.service';
import { BillService } from '../../shared/services/bill.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-production-global',
  templateUrl: './production-global.component.html',
  styleUrls: ['./production-global.component.css']
})
export class ProductionGlobalComponent implements OnInit {

  heads = ['Projet', 'Client', 'Ressource', 'Commande', 'Prod', 'CA de Production', 'Production', 'Action'];

  constructor(private productionService: ProductionService,
    private timeLineService: CalendarService,
    private developerService: DeveloperService,
    private factureService: BillService,
    private router: Router,
    private toastr: ToastrService) { }
  production = [];
  ngOnInit() {
    this.productionService.getAll().subscribe(res => {
      this.production = res as [];
      this.production.map(e => e.ca = e.caht - (e.prod * e.user.personalInformation.tjm));
    });
  }

  generate(prod) {
    const bill = {
      billDate: new Date(),
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
      this.toastr.success('Facture générer', 'Opération Réussite!');
    });
  }

  detail(commande) {
    this.router.navigate(['/bills'], { state: { data: { commande: commande.id } } });
  }

}

