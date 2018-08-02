import {ActionEditorComponent} from '../action/action-editor.component';
import {ContactEditorComponent} from '../contact/contact-editor.component';
import {SharedModule} from '../shared/shared.module';
import {ContractEditorComponent} from '../contract/contract-editor.component';
import {EvaluationEditorComponent} from '../evaluation/evaluation-editor.component';
import {DeveloperEditorComponent} from './developer-editor.component';
import {DeveloperCVComponent} from './developer-cv.component';

import {DeveloperTableComponent} from './developer-table.component';
import {DeveloperComponent} from './developer.component';
import {PersonalInfoEditorComponent} from './personal-info-editor.component';
import {SkillsEditorComponent} from './skills-editor.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {NgSelectModule} from '@ng-select/ng-select';
import {Ng2FileSizeModule} from "ng2-file-size";
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({
  imports: [SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    Ng2FileSizeModule,
    CommonModule,
    Ng2SmartTableModule],
  declarations: [DeveloperTableComponent, DeveloperEditorComponent,
    ContactEditorComponent, PersonalInfoEditorComponent, SkillsEditorComponent,
    DeveloperComponent, ContractEditorComponent, ActionEditorComponent, EvaluationEditorComponent, DeveloperCVComponent],
  exports: [DeveloperTableComponent, DeveloperEditorComponent, SkillsEditorComponent,
    ContactEditorComponent, PersonalInfoEditorComponent, DeveloperComponent, ContractEditorComponent, ActionEditorComponent
    , EvaluationEditorComponent, DeveloperCVComponent]
})
export class DeveloperModule {
}


