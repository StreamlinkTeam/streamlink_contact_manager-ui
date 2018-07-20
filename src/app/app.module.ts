import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard, LoginGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DeveloperComponent} from './developer/developer.component';
import {DeveloperModule} from './developer/developer.module';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {DeveloperEditorComponent} from './developer/developer-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule, DeveloperModule, AuthModule, HttpClientModule,
    RouterModule.forRoot([
      {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
      {
        path: 'developer', component: DeveloperComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developer/:mode/:reference', component: DeveloperEditorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developer/:mode', component: DeveloperEditorComponent,
        canActivate: [AuthGuard]
      },
      {path: '**', redirectTo: '/developer'}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ], bootstrap: [AppComponent]
})
export class AppModule {}
