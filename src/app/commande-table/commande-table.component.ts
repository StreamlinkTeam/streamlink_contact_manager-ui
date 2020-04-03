import {Component, OnInit} from '@angular/core';
import {CommandeService} from '../shared/services/commande.service';
import {BillService} from '../shared/services/bill.service';

@Component({
  selector: 'app-commande-table',
  templateUrl: './commande-table.component.html',
  styleUrls: ['./commande-table.component.css']
})
export class CommandeTableComponent implements OnInit {
  heads = ['id', 'date', 'Projet', 'Ressource', 'Montant HT', 'Montant Restant'];
  commandes = [];

  constructor(private commandeService: CommandeService, private billService: BillService) {
  }

  showSpinner = true;

  ngOnInit() {
    this.commandeService.getAllCommandes().subscribe(res => {
      this.commandes = res as [];
      this.showSpinner = false;
    });
  }

}
