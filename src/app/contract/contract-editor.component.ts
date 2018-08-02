import {Contract} from '../shared/entities/contract.model';
import {WishedContract} from '../shared/entities/wished-contract.model';
import {ContractService} from '../shared/services/contract.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

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


  constructor(private service: ContractService, private router: Router,
              private activeRoute: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.editing = this.activeRoute.snapshot.parent.params['mode'] === 'edit';

    console.info(this.activeRoute.snapshot.parent.params['reference']);
    if (this.editing) {
      this.service.getWishedContract
      (this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.wishedContract = response);

      this.service.getContract
      (this.activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => {
          this.contract = response;
          this.haveContract = this.contract != null && this.contract.reference != null;
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
      });


  }

  deleteContract() {

    this.service.deleteContract(this.contract.developerReference).subscribe(response => {
      this.contract = null;
      this.haveContract = false;
    });
  }

  saveContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        console.info(this.wishedContract);
        this.service.updateContract(this.contract, this.contract.developerReference).subscribe(response => console.info(response.developerReference));
      }
    }
    //    this.router.navigateByUrl('/developer');
  }

  saveWishedContract(form: NgForm) {

    if (form.valid) {
      if (this.editing) {
        console.info(this.wishedContract);
        this.service.updateWishedContract(this.wishedContract, this.wishedContract.developerReference).subscribe(response => console.info(response.developerReference));
      }
    }
    //    this.router.navigateByUrl('/developer');
  }
}
