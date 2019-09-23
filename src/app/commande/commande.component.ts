import { Component, OnInit } from '@angular/core';
import { Commande } from '../shared/entities/commande.model';
import { CommandeService } from '../shared/services/commande.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NeedService } from '../shared/services/need.service';
import { ProjectService } from '../shared/services/project.service';
import { SharingService } from '../shared/services/sharing.service';
import { PositioningService } from '../shared/services/positioning.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css']
})
export class CommandeComponent implements OnInit {
  project: any;
  responsibles = [];
  types = ['Régie', 'Forfait', 'Recrutement', 'Produit', 'Projet'];
  etats = ['En cours', 'Archivé'];
  commande: Commande = new Commande();
  constructor(private commandeService: CommandeService,
              private projectService: ProjectService,
              private needService: NeedService,
              private positioningService: PositioningService,
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
        this.responsibles = res.filter(function(e) {
          return e.roles[0] !== 'ROLE_RESOURCE';
        });
      });
    });
  }

  click() {
    this.commande.projet = this.project;
    this.commandeService.save(this.commande)
    //.subscribe(res => {
      //console.log(res);
    //})
  }

}
