import {ActionService} from './services/action.service';
import {AuthService} from './services/auth.service';
import {DeveloperService} from './services/developer.service';
import {EvaluationService} from './services/evaluation.service';
import {LanguageService} from './services/language.service';
import {UserService} from './services/user.service';
import {CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  providers: [DeveloperService, EvaluationService, ActionService, UserService, LanguageService, AuthService],
})
export class SharedModule {

}
