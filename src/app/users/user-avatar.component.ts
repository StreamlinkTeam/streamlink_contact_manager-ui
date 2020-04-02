import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../shared/entities/photo.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../shared/services/user.service';
import {NgForm} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.css']
})
export class UserAvatarComponent implements OnInit {

  fileToUpload: File = null;
  f: File = null;
  urlToReturn = '';

  photos: Photo[];
  photo: Photo;
  url: any;


  private _reference = new BehaviorSubject<string>('');

  @Input() set reference(value: string) {
    this._reference.next(value);
  }

  get reference() {
    return this._reference.getValue();
  }
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private service: UserService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this._reference.subscribe(reference => {

      this.urlToReturn = '/' + this.activeRoute.snapshot.parent.url[0].toString();


      this.service.getPhotoByUserReference(reference).subscribe(resp => {
        this.url = resp.url;
        this.photo = resp;
      });

      this.service.getUsersAvatars(reference)
        .subscribe(response => {
            this.photos = response;
          }
          ,
          error =>
            this.router.navigate([this.urlToReturn, 'error']));
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(form: NgForm) {

    if (form.valid) {
      this.service.createUserAvatar(this.fileToUpload, this.reference)
        .subscribe(data => {
          this.photo = data;
         // this.photos.push(data);
          this.fileToUpload = null;
          this.f = null;
          this.service.getPhotoByUserReference(this.reference).subscribe(resp => {
            this.url = resp.url;
            this.photo = resp;
          });
        }, error => {
          this.toastr.error('Erreur lors de la Création du Photo', 'Opération échoué !!!');
        });
    }
  }

  deletePhoto(index: number) {

    if (confirm('Suppression du Photo')) {
      const cv = this.photos[index];


      this.service.deleteAvatar(cv.reference, this.reference)
        .subscribe(response => {

          this.photos.splice(index, 1);
        }, error => {
          this.toastr.error('Erreur lors de la Suppression du Photo', 'Opération échoué !!!');
        });
    }
  }
}
