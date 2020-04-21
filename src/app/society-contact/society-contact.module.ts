import {SharedModule} from '../shared/shared.module';
import {SocietyContactEditorComponent} from './society-contact-editor.component';

import {SocietyContactTableComponent} from './society-contact-table.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';

import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ActionModule} from '../action/action.module';
import {ContactModule} from '../contact/contact.module';
import {SocietyContactComponent} from './society-contact.component';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {CardsModule} from 'angular-bootstrap-md';


@NgModule({
  imports: [SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    Ng2SmartTableModule,
    ActionModule,
    MatButtonModule, MatIconModule,
    ContactModule, CardsModule],
  declarations: [SocietyContactTableComponent, SocietyContactComponent, SocietyContactEditorComponent],
  exports: [SocietyContactTableComponent, SocietyContactComponent, SocietyContactEditorComponent]
})
export class SocietyContactModule {
}


