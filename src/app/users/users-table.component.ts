import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';
import {Row} from 'ng2-smart-table/lib/data-set/row';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../environments/environment';
import {UserService} from '../shared/services/user.service';


@Component({
  moduleId: module.id,
  templateUrl: 'users-table.component.html'
})
export class UserTableComponent implements OnInit {

  source: ServerDataSource;


  settings = {
    attr: {
      class: 'table table-striped table-sm'
    },
    edit: {
      editButtonContent: '<a class="btn btn-info" title="Modifier ou consulter"><i class="fa fa-pencil-square-o"></i></a>&nbsp'
    },
    delete: {
      deleteButtonContent: '<a class="btn btn-danger" title="Supprimer"><i class="fa fa-trash-o"></i></a>'
    },
    noDataMessage: 'Pas de valeur disponible !',
    actions: {
      columnTitle: '',
      add: false,
      position: 'right'
    },
    mode: 'external',
    columns: {
      firstname: {
        title: 'Nom',
        filter: false,
        sort: false
      },
      lastname: {
        title: 'Prénom',
        filter: false,
        sort: false
      },
      email: {
        title: 'Email',
        filter: false,
        sort: false
      }
    }
  };

  stages: any[];


  constructor(private service: UserService,
              private toastr: ToastrService,
              private http: HttpClient,
              private router: Router,
              private activeRoute: ActivatedRoute) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/admin/users']);
    }
  }


  ngOnInit() {

    const url = environment.API + '/ws/users/all';

    this.source = new ServerDataSource(this.http, {endPoint: url});

  }


  showUser(rowData: Row) {

    const user = rowData.getData();

    this.router.navigate(['/admin/users/edit', user.reference]);

  }

  deleteUser(rowData: Row) {

    const user = rowData.getData();
    if (confirm('Suppression de l\'utilisateur ' + user.firstname + ' ' + user.lastname)) {

      this.service.deleteUser(user.reference)
        .subscribe(res => {

          this.source.remove(rowData);
          this.toastr.success('Utilisateur Supprimé avec succés', 'Opération Réussite!');

        }, error => {
          this.toastr.error('Erreur lors de la suppression de l\'Utilisateur', 'Opération échoué !!!');
        });

    }
  }

}
