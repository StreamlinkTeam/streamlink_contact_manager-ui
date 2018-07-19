import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {AuthModule} from './auth/auth.module';
import {DeveloperComponent} from './developer/developer.component';
import {DeveloperModule} from './developer/developer.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DeveloperModule, AuthModule,
    RouterModule.forRoot([
      {path: 'auth', component: AuthComponent},
      {
        path: 'developer', component: DeveloperComponent,
        canActivate: [AuthGuard]
      },
      {path: '**', redirectTo: '/developer'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
