import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {ContactEditorComponent} from './contact-editor.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {CardsModule} from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import {UserModule} from '../users/user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    RouterModule,
    SharedModule,
    CardsModule,
    MatButtonModule,
    UserModule
  ],
  exports: [
    ContactEditorComponent
  ],
  declarations: [
    ContactEditorComponent
  ]
})

export class ContactModule {
}
