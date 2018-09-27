import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DeveloperModule} from './developer/developer.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ToastrModule} from 'ngx-toastr';
import {LoaderModule} from './loader/loader.module';
import {SocietyModule} from './society/society.module';
import {SocietyContactModule} from './society-contact/society-contact.module';
import {appRoutes} from './routes';
import {AdminModule} from './admin/admin.module';
import {ProfilModule} from './profil/profil.module';
import {AppNavbarModule} from './app-navbar/app-navbar.module';
import {ResourceModule} from './resource/resource.module';
import {ProjectModule} from './project/project.module';


registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, HttpClientModule, AppNavbarModule,
    LoaderModule, SocietyModule, AdminModule, ProfilModule,
    DeveloperModule, AuthModule, SocietyContactModule, ResourceModule,
    ProjectModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
