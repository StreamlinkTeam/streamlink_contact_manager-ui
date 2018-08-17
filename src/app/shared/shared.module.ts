import {ActionService} from './services/action.service';
import {AuthService} from './services/auth.service';
import {ContractService} from './services/contract.service';
import {DeveloperService} from './services/developer.service';
import {EvaluationService} from './services/evaluation.service';
import {LanguageService} from './services/language.service';
import {UserService} from './services/user.service';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ValidatorService} from "./services/validator.service";
import {FieldErrorDisplayComponent} from "./field-error-display/field-error-display.component";
import {LoaderService} from "./services/loader.service";

@NgModule({
  imports: [HttpClientModule, CommonModule],
  declarations: [FieldErrorDisplayComponent],
  exports: [FieldErrorDisplayComponent],
  providers: [DeveloperService, EvaluationService, ActionService,
    UserService, LanguageService, AuthService,
    ContractService, ValidatorService,LoaderService],
})
export class SharedModule {

}
