import {SharedModule} from '../shared/shared.module';


import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2FileSizeModule} from 'ng2-file-size';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {AdminComponent} from './admin.component';
import {UserTableComponent} from '../users/users-table.component';
import {UserEditorComponent} from '../users/users-editor.component';
import {UserModule} from '../users/user.module';


@NgModule({
  imports: [SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    UserModule,
    RouterModule,
    CommonModule],
  declarations: [AdminComponent],
  exports: [AdminComponent]
})
export class AdminModule {
}


