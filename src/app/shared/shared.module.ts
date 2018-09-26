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
import {ValidatorService} from './services/validator.service';
import {FieldErrorDisplayComponent} from './field-error-display/field-error-display.component';
import {LoaderService} from './services/loader.service';
import {SocietyService} from './services/society.service';
import {SocietyContactService} from "./services/society-contact.service";
import {CustomEnumRenderComponent} from './custom-ng2-smart-table-renderer/custom-enum-render.component';
import {EqualValidator} from './directives/equal-validator.directive';
import {ResourceService} from './services/resource.service';

@NgModule({
  imports: [HttpClientModule, CommonModule],
  entryComponents: [CustomEnumRenderComponent],
  declarations: [FieldErrorDisplayComponent, CustomEnumRenderComponent, EqualValidator],
  exports: [FieldErrorDisplayComponent, CustomEnumRenderComponent, EqualValidator],
  providers: [DeveloperService, EvaluationService, ActionService, ResourceService,
    UserService, LanguageService, AuthService, SocietyService,
    ContractService, ValidatorService, LoaderService, SocietyContactService],
})
export class SharedModule {

}
