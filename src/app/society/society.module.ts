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
import {Ng2FileSizeModule} from 'ng2-file-size';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {EvaluationModule} from '../evaluation/evaluation.module';
import {ActionModule} from '../action/action.module';
import {ContactModule} from '../contact/contact.module';
import {SocietyLegalInfoEditorComponent} from './society-legal-info-editor.component';


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
    EvaluationModule,
    ActionModule,
    ContactModule],
  declarations: [SocietyTableComponent, SocietyEditorComponent,
    SocietyComponent, SocietyLegalInfoEditorComponent],
  exports: [SocietyTableComponent, SocietyEditorComponent, SocietyComponent, SocietyLegalInfoEditorComponent]
})
export class SocietyModule {
}


