import {SharedModule} from '../shared/shared.module';
import {DeveloperComponent} from './developer.component';
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [SharedModule, BrowserModule, FormsModule, RouterModule],
  declarations: [DeveloperComponent],
  exports: [DeveloperComponent]
})
export class DeveloperModule {}
