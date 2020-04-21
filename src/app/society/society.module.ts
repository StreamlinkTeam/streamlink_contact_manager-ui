import {SharedModule} from '../shared/shared.module';
import {SocietyEditorComponent} from './society-editor.component';

import {SocietyTableComponent} from './society-table.component';
import {SocietyComponent} from './society.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ContactModule} from '../contact/contact.module';
import {SocietyLegalInfoEditorComponent} from './society-legal-info-editor.component';
import {ActionModule} from '../action/action.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import {MatDatepickerModule} from '@angular/material/datepicker';


import {ButtonsModule, CardsModule, WavesModule} from 'angular-bootstrap-md';

@NgModule({
  imports: [
    ButtonsModule, WavesModule, CardsModule, MatButtonModule, MatIconModule, MatTabsModule, MatInputModule,
    SharedModule, MatFormFieldModule, MatSelectModule,
    BrowserModule, MatDatepickerModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    Ng2SmartTableModule,
    ContactModule,
    ActionModule],
  declarations: [SocietyTableComponent, SocietyEditorComponent,
    SocietyComponent, SocietyLegalInfoEditorComponent],
  exports: [SocietyTableComponent, SocietyEditorComponent, SocietyComponent, SocietyLegalInfoEditorComponent]
})
export class SocietyModule {
}


