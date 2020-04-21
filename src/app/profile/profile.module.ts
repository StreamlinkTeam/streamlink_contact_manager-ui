import {SharedModule} from '../shared/shared.module';


import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ProfilePasswordEditorComponent} from './profile-password-editor.component';
import {MatIconModule, MatTabsModule, MatButtonModule} from '@angular/material';
import {CardsModule} from 'angular-bootstrap-md';



@NgModule({
  imports: [SharedModule,
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    CommonModule, MatTabsModule, CardsModule, MatIconModule],
  declarations: [ProfileComponent, ProfilePasswordEditorComponent],
  exports: [ProfileComponent, ProfilePasswordEditorComponent]
})
export class ProfileModule {
}


