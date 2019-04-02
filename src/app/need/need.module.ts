import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';

import {NeedComponent} from './need.component';
import {NeedTableComponent} from './need-table.component';
import {NeedInfoEditorComponent} from './need-info-editor.component';
import {NgModule} from '@angular/core';
import {NeedEditorComponent} from './need-editor.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2FileSizeModule} from 'ng2-file-size';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {MatTabsModule} from '@angular/material/tabs';

import {ButtonsModule, CardsFreeModule, WavesModule} from 'angular-bootstrap-md';


@NgModule({
  imports: [
    FormsModule, NgSelectModule, Ng2FileSizeModule, Ng2SmartTableModule, RouterModule, MatTabsModule,
    ButtonsModule,
    WavesModule,
    CardsFreeModule,
    BrowserAnimationsModule,
    SharedModule,
    CommonModule,
    BrowserModule],
  declarations: [NeedEditorComponent, NeedInfoEditorComponent, NeedTableComponent, NeedComponent],
  exports: [NeedEditorComponent, NeedInfoEditorComponent, NeedTableComponent, NeedComponent]
})
export class NeedModule {
}
