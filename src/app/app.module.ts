import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {DeveloperModule} from './developer/store.module';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, DeveloperModule,
    RouterModule.forRoot([
      {
        path: "developer", component: DeveloperModule,
//        canActivate: [StoreFirstGuard]
      },
      {path: "**", redirectTo: "/developer"}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
