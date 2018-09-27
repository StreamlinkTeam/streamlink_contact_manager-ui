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
import {ActionModule} from '../action/action.module';
import {ContactModule} from '../contact/contact.module';
import {ProjectTableComponent} from './project-table.component';
import {ProjectEditorComponent} from './project-editor.component';
import {ProjectComponent} from './project.component';


@NgModule({
  imports: [SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    Ng2FileSizeModule,
    CommonModule,
    Ng2SmartTableModule,
    ActionModule,
    ContactModule],
  declarations: [ProjectTableComponent, ProjectEditorComponent, ProjectComponent],
  exports: [ProjectTableComponent, ProjectEditorComponent, ProjectComponent]
})
export class ProjectModule {
}


