import {Contract} from '../shared/entities/contract.model';
import {WishedContract} from '../shared/entities/wished-contract.model';
import {ContractService} from '../shared/services/contract.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-contract',
  moduleId: module.id,
  templateUrl: 'contract-editor.component.html'
})
export class ContractEditorComponent implements OnInit {

  editing = false;
  wishedContract: WishedContract = new WishedContract();
  contract: Contract = new Contract();
  haveContract = false;
  urlToReturn = '';
  cjm;


  constructor(private service: ContractService, private router: Router, private toastr: ToastrService,
              private activeRoute: ActivatedRoute) {
    this.urlToReturn = '/' + this.activeRoute.snapshot.parent.url[0].toString();
  }

  ngOnInit(): void {

    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';

    if (this.editing) {

      this.service.getWishedContract(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.wishedContract = response,
          error => {
            this.router.navigate([this.urlToReturn, 'error']);
          });

      this.service.getContract(this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
          this.contract = response;
          this.cjm = (this.contract.salary * this.contract.coefficient) / this.contract.businessDays;

          this.haveContract = this.contract != null && this.contract.reference != null;
        }, error => {
          this.router.navigate([this.urlToReturn, 'error']);
        });
    }
  }

  initContract() {
    let con = new Contract();
    con.developerReference = this.wishedContract.developerReference;

    this.service.createContracts(con, this.wishedContract.developerReference)
      .subscribe(response => {
        this.contract = response;
        this.haveContract = true;
      }, error => {
        this.toastr.error('Erreur lors de la création du Contrat', 'Opération échoué !!!');
      });
  }

  deleteContract() {

    this.service.deleteContract(this.contract.developerReference)
      .subscribe(response => {
        this.contract = null;
        this.haveContract = false;
        this.toastr.success('Contrat supprimé avec succés', 'Opération Réussite!');

      }, error => {
        this.toastr.error('Erreur lors de la suppression du Contrat', 'Opération échoué !!!');
      });
  }

  saveContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        this.service.updateContract(this.contract, this.contract.developerReference)
          .subscribe(response => {
            this.cjm = (this.contract.salary * this.contract.coefficient) / this.contract.businessDays;


            this.toastr.success('Contrat Mis à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la Création du Contrat', 'Opération échoué !!!');
          });
      }
    }
  }

  saveWishedContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateWishedContract(this.wishedContract, this.wishedContract.developerReference)
          .subscribe(response => {

            this.toastr.success('Contrat Mis à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la Création du Contrat', 'Opération échoué !!!');
          });
      }
    }

  }
}
