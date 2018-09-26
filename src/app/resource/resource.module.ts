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
import {ResourceTableComponent} from './resource-table.component';
import {DeveloperModule} from '../developer/developer.module';
import {ResourceEditorComponent} from './resource-editor.component';


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
    DeveloperModule],
  declarations: [ResourceTableComponent, ResourceEditorComponent],
  exports: [ResourceTableComponent, ResourceEditorComponent]
})
export class ResourceModule {
}


