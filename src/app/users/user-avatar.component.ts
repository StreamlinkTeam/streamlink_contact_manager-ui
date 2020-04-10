import {Component, Input, OnInit} from '@angular/core';
import {Avatar} from '../shared/entities/avatar.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AvatarService} from '../shared/services/avatar.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  fileToUpload: File = null;
  f: File = null;
  isResource = false;

  avatar$: Observable<Avatar>;


  private _reference = new BehaviorSubject<string>('');

  @Input() set reference(value: string) {
    this._reference.next(value);
  }

  get reference() {
    return this._reference.getValue();
  }

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private service: AvatarService,
              private toastr: ToastrService) {


  }

  ngOnInit() {

    this.isResource = this.activeRoute.snapshot.parent.url[0].toString() === 'resources';
    this._reference.subscribe(reference => {
      this.avatar$ = this.service.getAvatarByUserReference(reference, this.isResource);
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(form: NgForm) {

    if (form.valid) {
      this.service.createAvatar(this.fileToUpload, this.reference, this.isResource)
        .subscribe(data => {
          this.avatar$ = of(data);
          // this.photos.push(data);
          this.fileToUpload = null;
          this.f = null;

        }, error => {
          this.toastr.error('Erreur lors de la Création du Photo', 'Opération échoué !!!');
        });
    }
  }


}
