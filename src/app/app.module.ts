import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard, LoginGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DeveloperTableComponent} from './developer/developer-table.component';
import {DeveloperModule} from './developer/developer.module';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {ContactEditorComponent} from './developer/contact-editor.component';
import {DeveloperEditorComponent} from './developer/developer-editor.component';
import {DeveloperComponent} from './developer/developer.component';
import {PersonalInfoEditorComponent} from './developer/personal-info-editor.component';
import {SkillsEditorComponent} from './developer/skills-editor.component';


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
        path: 'developer', component: DeveloperTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developer/:mode/:reference', component: DeveloperComponent, canActivate: [AuthGuard],
        children: [
          {path: 'general', component: DeveloperEditorComponent},
          {path: 'contact', component: ContactEditorComponent},
          {path: 'skills', component: SkillsEditorComponent},
          {path: 'personal-info', component: PersonalInfoEditorComponent},
          {path: '**', redirectTo: 'general'}
        ]
      },
      //      {
      //        path: 'developer/:mode/:reference', component: DeveloperEditorComponent,
      //        canActivate: [AuthGuard]
      //      },
      {
        path: 'developer/:mode', component: DeveloperComponent,
        canActivate: [AuthGuard],
        children: [
          {path: 'general', component: DeveloperEditorComponent},
          {path: 'contact', component: ContactEditorComponent},
          {path: 'skills', component: DeveloperEditorComponent},
          {path: 'personal-info', component: PersonalInfoEditorComponent},
          {path: '**', redirectTo: 'general'}
        ]
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
