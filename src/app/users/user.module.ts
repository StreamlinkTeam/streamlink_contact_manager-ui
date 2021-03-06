import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UserEditorComponent} from './users-editor.component';
import {UserTableComponent} from './users-table.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';


@NgModule({
  imports: [
    SharedModule, MatButtonModule, MatIconModule, MatInputModule,
    BrowserModule, ButtonsModule, CardsFreeModule, WavesModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    Ng2SmartTableModule
  ],
  exports: [UserEditorComponent, UserTableComponent],
  declarations: [UserEditorComponent, UserTableComponent]
})

export class UserModule {
}
