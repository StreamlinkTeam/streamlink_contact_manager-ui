import {AuthInterceptor} from '../auth.interceptor';
import {SharedModule} from '../shared/shared.module';
import {DeveloperEditorComponent} from './developer-editor.component';
import {DeveloperComponent} from './developer.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {MultiSelectModule} from 'primeng/multiselect';



@NgModule({
  imports: [SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    TableModule,
    DropdownModule,
    MultiSelectModule],
  declarations: [DeveloperComponent, DeveloperEditorComponent],
  exports: [DeveloperComponent, DeveloperEditorComponent]
})
export class DeveloperModule {}
