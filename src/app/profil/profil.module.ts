import {SharedModule} from '../shared/shared.module';


import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {UserModule} from '../users/user.module';
import {ProfilComponent} from './profil.component';
import {ProfilPasswordEditorComponent} from './profil-password-editor.component';


@NgModule({
  imports: [SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    UserModule,
    RouterModule,
    CommonModule],
  declarations: [ProfilComponent, ProfilPasswordEditorComponent],
  exports: [ProfilComponent, ProfilPasswordEditorComponent]
})
export class ProfilModule {
}


