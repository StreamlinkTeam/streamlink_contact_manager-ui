import {ActionEditorComponent} from '../action/action-editor.component';
import {AuthInterceptor} from '../auth.interceptor';
import {ContactEditorComponent} from '../contact/contact-editor.component';
import {SharedModule} from '../shared/shared.module';
import {ContractEditorComponent} from '../contract/contract-editor.component';
import {EvaluationEditorComponent} from '../evaluation/evaluation-editor.component';
import {DeveloperEditorComponent} from './developer-editor.component';
import {DeveloperTableComponent} from './developer-table.component';
import {DeveloperComponent} from './developer.component';
import {PersonalInfoEditorComponent} from './personal-info-editor.component';
import {SkillsEditorComponent} from './skills-editor.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';
import {NgSelectModule} from '@ng-select/ng-select';



@NgModule({
  imports: [SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    TableModule,
    DropdownModule,
    CommonModule,
    MultiSelectModule],
  declarations: [DeveloperTableComponent, DeveloperEditorComponent,
    ContactEditorComponent, PersonalInfoEditorComponent, SkillsEditorComponent,
    DeveloperComponent, ContractEditorComponent, ActionEditorComponent, EvaluationEditorComponent],
  exports: [DeveloperTableComponent, DeveloperEditorComponent, SkillsEditorComponent,
    ContactEditorComponent, PersonalInfoEditorComponent, DeveloperComponent, ContractEditorComponent, ActionEditorComponent
    , EvaluationEditorComponent]
})
export class DeveloperModule {}


