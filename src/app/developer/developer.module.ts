import {SharedModule} from '../shared/shared.module';
import {DeveloperComponent} from './developer.component';
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
  declarations: [DeveloperComponent],
  exports: [DeveloperComponent]
})
export class DeveloperModule {}
