import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../shared/services/commande.service';
import { ProductionService } from '../../shared/services/production.service';
import { CalendarService } from '../../calendar/calendar.service';
import { DeveloperService } from '../../shared/services/developer.service';
import { UserService } from '../../shared/services/user.service';
import { BillService } from '../../shared/services/bill.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PositioningService } from '../../shared/services/positioning.service';

@Component({
  selector: 'app-production-global',
  templateUrl: './production-global.component.html',
  styleUrls: ['./production-global.component.css']
})
export class ProductionGlobalComponent implements OnInit {
  allProjects = [];
  allOriginalPrjects = [];
  allResources = [];
  allCommandes = [];
  allClients = [];
  filterargs = {};
  showSpinner = true;
  heads = ['Projet', 'Client', 'Ressource', 'Commande', 'Prod', 'CA de Production', 'Production', 'Action'];

  constructor(private productionService: ProductionService,
    private timeLineService: CalendarService,
    private positioningService: PositioningService,
    private developerService: DeveloperService,
    private factureService: BillService,
    private commandeService: CommandeService,
    private router: Router,
    private toastr: ToastrService) { }
  production = [];

  ngOnInit() {
    this.productionService.getAll().subscribe(res => {
      this.production = res as [];
      this.production.map(e => e.ca = e.prod * e.project.tjm);
      this.showSpinner = false;
    });

    this.positioningService.getPositionings().subscribe(res => {
      this.allProjects = res;
      this.allOriginalPrjects = res;
    });
    this.developerService.getDevelopers().subscribe(res => this.allResources = res);
    this.commandeService.getAllCommandes().subscribe(res => this.allCommandes = res);
  }



  detail(commande) {
    this.router.navigate(['/bills'], { state: { data: { commande: commande.id } } });
  }

  onSelectChange(type, value) {
    this.filterargs[type] = value;
    console.log(this.filterargs)
  }

}

