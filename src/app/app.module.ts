import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';


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
import {NeedModule} from './need/need.module';
import {PositioningModule} from './positioning/positioning.module';
import {PositioningAddComponent} from './positioning-add/positioning-add.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgSelectModule} from '@ng-select/ng-select';
import {PositioningEditComponent} from './positioning-edit/positioning-edit.component';

import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {ButtonsModule, IconsModule, MDBBootstrapModule, NavbarModule, WavesModule} from 'angular-bootstrap-md';

import {InputTextModule} from 'primeng/inputtext';
import {FooterComponent} from './footer/footer.component';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FakeDbService } from './fake-db/fake-db.service';
import { CalendarModule } from 'angular-calendar';
import { CalendarComponent } from './calendar/calendar.component';
import { FuseModule } from '../@fuse/fuse.module';
import { fuseConfig } from './fuse-config';



registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [AppComponent, PositioningAddComponent, PositioningEditComponent, FooterComponent],
  imports: [
    MDBBootstrapModule, NavbarModule, ButtonsModule, WavesModule, IconsModule,
    BrowserModule, HttpClientModule, AppNavbarModule,
    LoaderModule, SocietyModule, AdminModule, ProfilModule, PositioningModule,
    DeveloperModule, AuthModule, SocietyContactModule, ResourceModule,
    ProjectModule, NeedModule,CalendarModule,
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule,
    [SweetAlert2Module.forRoot()],
    InMemoryWebApiModule.forRoot(FakeDbService, {
      delay             : 0,
      passThruUnknownUrl: true
  }),
    BrowserAnimationsModule,
    InputTextModule,
    MatButtonModule, MatIconModule, MatInputModule, MatDatepickerModule,
    MatProgressSpinnerModule, MatMomentDateModule, MatSelectModule, MatToolbarModule,
    FuseModule.forRoot(fuseConfig),

  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent],
  entryComponents: [PositioningAddComponent]
})
export class AppModule {
}
