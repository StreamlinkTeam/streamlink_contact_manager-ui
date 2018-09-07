import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppNavbarComponent} from './app-navbar.component';
import {SharedModule} from '../shared/shared.module';
import {AppNavbarService} from './app-navbar.service';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [AppNavbarComponent],
  imports: [BrowserModule, RouterModule, SharedModule],
  exports: [AppNavbarComponent],
  providers: [AppNavbarService],
})
export class AppNavbarModule {
}
