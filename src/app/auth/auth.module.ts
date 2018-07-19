import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {AuthGuard} from './auth.guard';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [SharedModule, CommonModule, FormsModule],
  providers: [AuthGuard],
  exports: [AuthComponent],
  declarations: [AuthComponent]
})
export class AuthModule {}
