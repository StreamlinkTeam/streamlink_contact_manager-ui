import {ActionTableComponent} from './action-table.component';
import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ActionEditorComponent} from './action-editor.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    ActionEditorComponent,
    ActionTableComponent
  ],
  declarations: [
    ActionEditorComponent,
    ActionTableComponent
  ]
})

export class ActionModule {
}
