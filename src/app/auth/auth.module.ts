import {SharedModule} from '../shared/shared.module';
import {AuthComponent} from './auth.component';
import {AuthGuard, LoginGuard} from './auth.guard';
import {AuthInterceptor} from '../auth.interceptor';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [SharedModule, CommonModule, FormsModule],
  providers: [AuthGuard, LoginGuard],
  exports: [AuthComponent],
  declarations: [AuthComponent]
})
export class AuthModule {
}
