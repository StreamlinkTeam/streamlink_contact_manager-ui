import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NeedService} from '../shared/services/need.service';
import {Component} from '@angular/core';
import {NeedInformation} from '../shared/entities/need.model';
import {ToastrService} from 'ngx-toastr';


@Component({
  moduleId: module.id,
  selector: 'app-need-info',
  templateUrl: 'need-info-editor.component.html'
})
export class NeedInfoEditorComponent {

  editing = false;
  needInfo: NeedInformation = new NeedInformation();


  constructor(private service: NeedService,
              private toastr: ToastrService,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    this.editing = activeRoute.snapshot.parent.params['mode'] === 'edit';


    if (this.editing) {
      service.getNeedInformation(activeRoute.snapshot.parent.params['reference'])
        .subscribe(response => this.needInfo = response
          ,
          error =>
            this.router.navigate(['needs', 'error']));
    }
  }

  save(form: NgForm) {

    if (form.valid) {
      if (this.editing) {

        this.service.updateNeedInformation(this.needInfo, this.needInfo.needReference)
          .subscribe(response => {

            this.needInfo = response;
            this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');

          }, error => {
            this.toastr.error('Erreur lors de la mise à jour des donnés', 'Opération échoué !!!');
          });
      }
    }
  }

}
