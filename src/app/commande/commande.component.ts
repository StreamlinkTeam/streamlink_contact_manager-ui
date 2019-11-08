import { Component, OnInit } from '@angular/core';
import { Commande } from '../shared/entities/commande.model';
import { CommandeService } from '../shared/services/commande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NeedService } from '../shared/services/need.service';
import { ProjectService } from '../shared/services/project.service';
import { SharingService } from '../shared/services/sharing.service';
import { PositioningService } from '../shared/services/positioning.service';
import { UserService } from '../shared/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  project: any;
  responsibles = [];
  commandeDate;
  types = ['Régie', 'Forfait', 'Recrutement', 'Produit', 'Projet'];
  etats = ['En cours', 'Archivé'];
  commande: Commande = new Commande();

  constructor(private commandeService: CommandeService,
    private sharingService: SharingService,
    private userService: UserService) { }

  ngOnInit() {
    this.sharingService.currentMessage.subscribe(msg => {
      const obj = JSON.parse(msg);
      console.log(obj);
      this.project = obj;
      this.commande.refClient = obj.client;
      this.commande.accordClient = 0;
      this.commande.besoinReference = obj.needReference;
      this.commande.besoinTitle = obj.needTitle;
      this.userService.getUsers().subscribe(res => {
        this.responsibles = res.filter(function (e) {
          return e.roles[0] !== 'ROLE_RESOURCE';
        });
      });
    });
  }

  save() {
    this.commande.date = new Date(this.commandeDate);
    this.commande.projet = this.project;
    this.commande.projectId = this.project.id;
    this.commande.userId = this.commande.user.id;
    this.commande.montantR = 0;
    this.commandeService.save(this.commande).subscribe(res => {
      Swal.fire(
        'Commande crée avec succès !',
        '',
        'success'
      )
    });
  }

}
